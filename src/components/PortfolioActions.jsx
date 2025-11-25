import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSummary, addSkill, addProject } from '../features/profile/profileSlice.js';
import { Card, CardContent, TextField, Button, Stack } from '@mui/material';

export default function PortfolioActions() {
  const dispatch = useDispatch();
  const [summary, setSummary] = useState('');
  const [skill, setSkill] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <Card sx={{ mt: 3 }} variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <TextField label="Update summary" fullWidth value={summary} onChange={(e) => setSummary(e.target.value)} />
          <Button onClick={() => summary && (dispatch(updateSummary(summary)), setSummary(''))}>
            Update Summary
          </Button>

          <TextField label="Add skill" fullWidth value={skill} onChange={(e) => setSkill(e.target.value)} />
          <Button onClick={() => skill && (dispatch(addSkill(skill)), setSkill(''))}>
            Add Skill
          </Button>

          <TextField label="Project title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Project desc" value={desc} onChange={(e) => setDesc(e.target.value)} fullWidth />

          <Button onClick={() => {
            if (title) {
              dispatch(addProject({ id: Date.now(), title, desc }));
              setTitle('');
              setDesc('');
            }
          }}>
            Add Project
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
