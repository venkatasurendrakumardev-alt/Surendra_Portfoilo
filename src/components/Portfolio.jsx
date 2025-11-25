// src/components/Portfolio.jsx
import React, { useState } from 'react';
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

  return (
    <Box sx={{ pb: 6, px: { xs: 2, md: 0 } }}>
      {/* Header */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3, bgcolor: 'background.default' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 4 } }}>
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
        </Toolbar>
      </AppBar>

      {/* Main layout */}
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
        {/* Left column */}
        <Box>
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

          <SectionCard
            id="projects"
            title="Projects"
            summary={projects && projects.length ? `${projects.length} project(s)` : 'No projects yet'}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
          >
            <Stack spacing={2}>
              {projects.length ? (
                projects.map((p) => (
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
                  No projects listed.
                </Typography>
              )}
            </Stack>
          </SectionCard>

          <SectionCard
            id="experience"
            title="Experience"
            summary={experience && experience.length ? `${experience.length} company(s)` : 'No experience listed'}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
          >
            <Stack spacing={2}>
              {experience.map((exp, i) =>
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
              )}
            </Stack>
          </SectionCard>
        </Box>

        {/* Right column */}
        <Box>
          <SectionCard
            id="skills"
            title="Skills"
            summary={skills && skills.length ? skills.slice(0, 6).join(', ') : 'No skills listed'}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            small
          >
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {skills.map((s, i) => (
                <Chip key={i} label={s} sx={{ mb: 1, mr: 1 }} />
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              You can add/remove skills from the Redux slice (profile data).
            </Typography>
          </SectionCard>

          <SectionCard
            id="education"
            title="Education"
            summary={education && education.length ? `${education[0].title} • ${education[0].year}` : 'No education listed'}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            small
          >
            <List dense>
              {education.map((ed, i) => (
                <ListItem key={i}>
                  <ListItemText primary={ed.title} secondary={`${ed.org} • ${ed.year}`} />
                </ListItem>
              ))}
            </List>
          </SectionCard>

          <SectionCard
            id="awards"
            title="Awards & Achievements"
            summary={awards && awards.length ? awards.slice(0, 2).join(', ') : 'No awards listed'}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            small
          >
            <Stack component="ul" sx={{ pl: 2, mt: 1 }}>
              {awards.map((a, i) => (
                <li key={i}>
                  <Typography variant="body2" color="text.secondary">
                    {a}
                  </Typography>
                </li>
              ))}
            </Stack>
          </SectionCard>

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

      {/* Footer */}
      <Box component="footer" sx={{ mt: 4, py: 3, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2">© {new Date().getFullYear()} {name}. Built with React & Material UI.</Typography>
      </Box>
    </Box>
  );
}
