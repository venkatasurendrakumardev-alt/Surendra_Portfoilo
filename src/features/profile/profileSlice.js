// src/features/profile/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'P. VENKATA SURENDRA KUMAR',
  title: 'Frontend Developer (ReactJS)',
  location: 'Hyderabad, India',
  phone: '+91 8919909069',
  experienceYears: 'Around 4.5 years',
  summary:
    'Frontend Developer with ~4.5 years of experience building dynamic, responsive and user-focused web applications using ReactJS, JavaScript, HTML and CSS. Experienced with Redux, Material UI, REST API integration and optimizing frontend performance. Strong experience in Agile/Scrum teams, version control and producing maintainable code.',
  skills: [
    'ReactJS',
    'JavaScript (ES6+)',
    'HTML5',
    'CSS3',
    'Redux',
    'Material UI',
    'SQL Server',
    'Git',
    'Jira',
    'Agile / Scrum',
  ],
  projects: [
    {
      id: 'p-klm',
      title: 'KLM Air France — Services Portal (TCS)',
      desc:
        'Built responsive, accessible UI for KLM Airlines Services Portal using ReactJS, Redux and Material UI. Implemented component-based architecture, API integration, performance optimizations (lazy loading, code-splitting) and worked in Agile sprints.',
      link: '',
      period: '03/2023 – 07/2025',
      tech: ['ReactJS', 'Redux', 'Material UI', 'Axios'],
    },
    {
      id: 'p-sonic',
      title: 'Sonic Healthcare Web App (TCS)',
      desc:
        'Implemented front-end features for Sonic Healthcare using React, hooks, Material UI and responsive design. Converted wireframes to high-quality UI, integrated services and followed best practices for maintainability and testing.',
      link: '',
      period: '03/2021 – 02/2023',
      tech: ['ReactJS', 'Material UI', 'HTML5', 'CSS3'],
    },
  ],
  experience: [
    {
      company: 'TCS — Hyderabad',
      roles: [
        {
          title: 'Frontend Developer',
          period: '03/2023 – 07/2025',
          details:
            'Worked on KLM Air France project: designed reusable components, implemented state management with Redux, integrated REST APIs, improved performance and ensured responsiveness and accessibility.',
        },
        {
          title: 'Frontend Developer',
          period: '03/2021 – 02/2023',
          details:
            'Worked on Sonic Healthcare project: converted wireframes to SPAs using React, collaborated with backend and QA, used Git and Jira in Agile workflows.',
        },
      ],
    },
  ],
  education: [
    { title: 'B.Tech - Computer Science', org: 'G. Pullareddy Engineering College, Kurnool', year: '2019' },
    { title: 'Diploma - Computer Engineering', org: 'Govt Polytechnic College', year: '2015' },
    { title: 'SSC', org: 'Sai Baba English Medium High School', year: '2012' },
  ],
  awards: [
    'On the Spot Award',
    'Service and Commitment Award',
    'Cracked Digital Assessment (TCS)',
    'Qualified GATE - 2019',
  ],
  contact: {
    email: 'venkata.surendra.kumar.dev@gmail.com',
    phone: '+91 8919909069',
    github: '', // add your GitHub URL here
    linkedin: '', // add your LinkedIn URL here
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateSummary(state, action) {
      state.summary = action.payload;
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    updateContact(state, action) {
      state.contact = { ...state.contact, ...action.payload };
    },
    replaceProfile(state, action) {
      return action.payload;
    },
  },
});

export const { updateSummary, addSkill, addProject, updateContact, replaceProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
