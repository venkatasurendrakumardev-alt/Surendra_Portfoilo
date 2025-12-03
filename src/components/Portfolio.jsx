// src/components/Portfolio.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  Chip,
  Stack,
  Link,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SectionCard({ id, title, summary, expandedId, setExpandedId, children, small }) {
  const expanded = expandedId === id;
  const toggle = () => setExpandedId(expanded ? null : id);
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardActionArea
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={`${id}-content`}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}
      >
        <Box>
          <Typography variant={small ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {summary && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {summary}
            </Typography>
          )}
        </Box>
        <IconButton
          aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          size="large"
        >
          <ExpandMoreIcon
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 200ms',
            }}
          />
        </IconButton>
      </CardActionArea>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent id={`${id}-content`}>{children}</CardContent>
      </Collapse>

      {/* optional actions or small hint */}
      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {expanded ? 'Click title to collapse' : 'Click title to expand'}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default function Portfolio() {
  const profile = useSelector((state) => state.profile) || {};

  const {
    name = 'Your Name',
    title = '',
    location = '',
    summary = '',
    skills = [],
    projects = [],
    experience = [],
    education = [],
    awards = [],
    contact = {},
  } = profile;

  const initials = (name || '')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // expanded card id state
  const [expandedId, setExpandedId] = useState(null);

  // Global search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({});

  // Debounce search by 250ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get unique categories from projects
  const categories = useMemo(() => {
    const cats = new Set();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [projects]);

  // Helper function to check if text matches search term
  const matchesSearch = (text) => {
    if (!debouncedSearchTerm) return true;
    return text.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(term);
        const descMatch = p.desc.toLowerCase().includes(term);
        const techMatch = p.tech && p.tech.some((t) => t.toLowerCase().includes(term));
        return titleMatch || descMatch || techMatch;
      });
    }

    const selectedCats = Object.keys(selectedCategories).filter((cat) => selectedCategories[cat]);
    if (selectedCats.length > 0) {
      filtered = filtered.filter((p) => selectedCats.includes(p.category));
    }

    return filtered;
  }, [projects, debouncedSearchTerm, selectedCategories]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter((s) => matchesSearch(s));
  }, [skills, debouncedSearchTerm]);

  // Filter experience
  const filteredExperience = useMemo(() => {
    return experience.filter((exp) => {
      const companyMatch = matchesSearch(exp.company);
      const rolesMatch =
        exp.roles &&
        exp.roles.some(
          (r) =>
            matchesSearch(r.title) ||
            matchesSearch(r.details) ||
            matchesSearch(r.period)
        );
      return companyMatch || rolesMatch;
    });
  }, [experience, debouncedSearchTerm]);

  // Filter education
  const filteredEducation = useMemo(() => {
    return education.filter((ed) => matchesSearch(ed.title) || matchesSearch(ed.org));
  }, [education, debouncedSearchTerm]);

  // Filter awards
  const filteredAwards = useMemo(() => {
    return awards.filter((a) => matchesSearch(a));
  }, [awards, debouncedSearchTerm]);

  // Check if any content matches the search
  const hasAnyMatch = useMemo(() => {
    if (!debouncedSearchTerm) return true; // Show all if no search
    return (
      filteredProjects.length > 0 ||
      filteredSkills.length > 0 ||
      filteredExperience.length > 0 ||
      filteredEducation.length > 0 ||
      filteredAwards.length > 0
    );
  }, [
    debouncedSearchTerm,
    filteredProjects,
    filteredSkills,
    filteredExperience,
    filteredEducation,
    filteredAwards,
  ]);

  return (
    <Box sx={{ pb: 6, px: { xs: 2, md: 0 } }}>
      {/* Header */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3, bgcolor: 'background.default' }}
      >
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', px: { xs: 1, md: 4 }, gap: 2 }}>
          {/* First row: Name and Contact */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 20 }}>
                {initials}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {title} {location ? `• ${location}` : ''}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              {contact.github && (
                <IconButton component={Link} href={contact.github} target="_blank" rel="noopener" aria-label="Github" size="large">
                  <GitHubIcon />
                </IconButton>
              )}
              {contact.linkedin && (
                <IconButton component={Link} href={contact.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" size="large">
                  <LinkedInIcon />
                </IconButton>
              )}
              {contact.email && (
                <Button variant="outlined" startIcon={<EmailIcon />} href={`mailto:${contact.email}`} size="small">
                  Email
                </Button>
              )}
              <Button variant="contained" startIcon={<DownloadIcon />} color="primary" href="/CV.pdf" sx={{ ml: 1 }}>
                Download CV
              </Button>
            </Stack>
          </Stack>

          {/* Second row: Global Search & Filter */}
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Search everything..."
                placeholder="Search projects, skills, experience, education, awards..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search all sections"
                sx={{ maxWidth: '500px' }}
              />
              {categories.length > 0 && (
                <FormGroup row>
                  <Typography variant="caption" sx={{ fontWeight: 600, mr: 2, alignSelf: 'center' }}>
                    Filter Projects by Category:
                  </Typography>
                  {categories.map((cat) => (
                    <FormControlLabel
                      key={cat}
                      control={
                        <Checkbox
                          size="small"
                          checked={selectedCategories[cat] || false}
                          onChange={(e) =>
                            setSelectedCategories((prev) => ({
                              ...prev,
                              [cat]: e.target.checked,
                            }))
                          }
                          aria-label={`Filter by ${cat}`}
                        />
                      }
                      label={<Typography variant="body2">{cat}</Typography>}
                    />
                  ))}
                </FormGroup>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      {/* No results message */}
      {!hasAnyMatch && debouncedSearchTerm && (
        <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            No results found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your search for "<strong>{debouncedSearchTerm}</strong>" didn't match anything. Try a different search term.
          </Typography>
        </Box>
      )}

      {/* Main layout - only show if there are matches or no search */}
      {hasAnyMatch && (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
        {/* Left column */}
        <Box>
          {(!debouncedSearchTerm || filteredProjects.length > 0 || filteredExperience.length > 0) && (
            <>
              <SectionCard
                id="about"
                title="About / Summary"
                summary={summary && summary.slice(0, 180) + (summary.length > 180 ? '…' : '')}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {summary}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Tip: Click the card title to collapse this section.
                </Typography>
              </SectionCard>
            </>
          )}

          {(!debouncedSearchTerm || filteredProjects.length > 0) && (
            <SectionCard
              id="projects"
              title="Projects"
              summary={projects && projects.length ? `${projects.length} project(s)` : 'No projects yet'}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            >
              <Stack spacing={2}>
                {filteredProjects.length ? (
                  filteredProjects.map((p) => (
                    <Box key={p.id || p.title}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {p.title}
                      </Typography>
                      {p.period && (
                        <Typography variant="caption" color="text.secondary">
                          {p.period}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {p.desc}
                      </Typography>
                      {p.tech && (
                        <Box sx={{ mt: 1 }}>
                          {p.tech.map((t) => (
                            <Chip key={t} label={t} size="small" sx={{ mr: 1, mt: 1 }} />
                          ))}
                        </Box>
                      )}
                      {p.link && (
                        <Box sx={{ mt: 1 }}>
                          <Button size="small" href={p.link} target="_blank" rel="noopener">
                            View project
                          </Button>
                        </Box>
                      )}
                      <Divider sx={{ my: 2 }} />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {projects.length === 0
                      ? 'No projects listed.'
                      : 'No projects match your search or filter criteria.'}
                  </Typography>
                )}
              </Stack>
            </SectionCard>
          )}

          {(!debouncedSearchTerm || filteredExperience.length > 0) && (
            <SectionCard
              id="experience"
              title="Experience"
              summary={experience && experience.length ? `${experience.length} company(s)` : 'No experience listed'}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            >
              <Stack spacing={2}>
                {filteredExperience.length ? (
                  filteredExperience.map((exp, i) =>
                    exp.roles ? (
                      <Box key={i}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {exp.company}
                        </Typography>
                        {exp.roles.map((r, idx) => (
                          <Box key={idx} sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {r.title}{' '}
                              <Typography component="span" variant="caption" color="text.secondary">
                                • {r.period}
                              </Typography>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {r.details}
                            </Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 1 }} />
                      </Box>
                    ) : (
                      <Typography key={i} variant="body2" color="text.secondary">
                        {exp.company}
                      </Typography>
                    )
                  )
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No experience matches your search.
                  </Typography>
                )}
              </Stack>
            </SectionCard>
          )}
        </Box>

        {/* Right column */}
        <Box>
          {(!debouncedSearchTerm || filteredSkills.length > 0) && (
            <SectionCard
              id="skills"
              title="Skills"
              summary={skills && skills.length ? skills.slice(0, 6).join(', ') : 'No skills listed'}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              small
            >
              {filteredSkills.length ? (
                <>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {filteredSkills.map((s, i) => (
                      <Chip key={i} label={s} sx={{ mb: 1, mr: 1 }} />
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                </>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  No skills match your search.
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                You can add/remove skills from the Redux slice (profile data).
              </Typography>
            </SectionCard>
          )}

          {(!debouncedSearchTerm || filteredEducation.length > 0) && (
            <SectionCard
              id="education"
              title="Education"
              summary={education && education.length ? `${education[0].title} • ${education[0].year}` : 'No education listed'}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              small
            >
              {filteredEducation.length ? (
                <List dense>
                  {filteredEducation.map((ed, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={ed.title} secondary={`${ed.org} • ${ed.year}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No education matches your search.
                </Typography>
              )}
            </SectionCard>
          )}

          {(!debouncedSearchTerm || filteredAwards.length > 0) && (
            <SectionCard
              id="awards"
              title="Awards & Achievements"
              summary={awards && awards.length ? awards.slice(0, 2).join(', ') : 'No awards listed'}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              small
            >
              {filteredAwards.length ? (
                <Stack component="ul" sx={{ pl: 2, mt: 1 }}>
                  {filteredAwards.map((a, i) => (
                    <li key={i}>
                      <Typography variant="body2" color="text.secondary">
                        {a}
                      </Typography>
                    </li>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No awards match your search.
                </Typography>
              )}
            </SectionCard>
          )}

          <SectionCard
            id="contact"
            title="Contact"
            summary={contact.email || contact.phone || '—'}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            small
          >
            <Stack spacing={1}>
              {contact.email && (
                <Typography variant="body2">
                  <strong>Email:</strong> <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                </Typography>
              )}
              {contact.phone && (
                <Typography variant="body2">
                  <strong>Phone:</strong> {contact.phone}
                </Typography>
              )}
              {contact.github && (
                <Typography variant="body2">
                  <strong>GitHub:</strong> <Link href={contact.github} target="_blank">{contact.github}</Link>
                </Typography>
              )}
              {contact.linkedin && (
                <Typography variant="body2">
                  <strong>LinkedIn:</strong> <Link href={contact.linkedin} target="_blank">{contact.linkedin}</Link>
                </Typography>
              )}
            </Stack>
          </SectionCard>

          <Box sx={{ mt: 1 }}>
            <Button variant="contained" fullWidth href="/CV.pdf" startIcon={<DownloadIcon />}>
              Download CV
            </Button>
          </Box>
        </Box>
      </Box>
      )}

      {/* Footer */}
      <Box component="footer" sx={{ mt: 4, py: 3, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2">© {new Date().getFullYear()} {name}. Built with React & Material UI.</Typography>
      </Box>
    </Box>
  );
}