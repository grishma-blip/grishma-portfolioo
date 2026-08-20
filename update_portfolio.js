const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = '/Users/thakaregrishma/Downloads/shan-portfolio-main/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html);

// 1. Update Hero tags
const heroTags = [
  "Java, JS, TS, Python", 
  "React.js, React Native",
  "Node.js, Spring Boot", 
  "PostgreSQL, MongoDB", 
  "AWS, GCP, Docker, AI/ML"
];
$('.banner-three-list ul li').each((i, el) => {
  if (i < heroTags.length) {
    // Keep the icon, just change the text
    const icon = $(el).find('span').html();
    $(el).html(`<span>${icon}</span> ${heroTags[i]}`);
  } else {
    $(el).remove();
  }
});

// 2. Update About section
$('.about-three-title').text('I am Grishma Thakare, a B.Tech CSE student at ITM Skills University (2024-2028). I specialize in full-stack development, AI/ML, and building impactful digital experiences.');
const aboutParagraphs = $('.about-three-right p');
$(aboutParagraphs[0]).text('I am a proactive and enthusiastic Software Developer with hands-on experience in MERN stack, Node.js, and React. As a Software Developer Intern at LetsUpgrade and Frontend Developer Intern at Desi Destiny, I have delivered full-stack modules for 4M+ learners and rebuilt responsive company websites.');
$(aboutParagraphs[1]).text('My projects include Sahayak Navigator, a voice-guided urban navigation system for visually impaired users utilizing Computer Vision and AWS. I also built a Data Migration CLI Tool that automates PostgreSQL-to-AWS migration with AES encryption.');
$(aboutParagraphs[2]).text('I am a HackWithMumbai 2.0 Winner and a 3x National Hackathon Finalist in full-stack and AI/ML tracks. I am passionate about learning and leveraging modern cloud and DevOps tools like Kubernetes and Terraform to build scalable systems.');

// 3. Update Services -> Experience & Education
$('.service-three-title').text('Experience & Education');
// There are probably multiple service cards, let's map them to 3 items
const expItems = [
  {
    title: 'LetsUpgrade',
    subtitle: 'Software Developer Intern (Dec 2024 - Jan 2025) | Navi Mumbai',
    desc: 'Designed full-stack curriculum modules covering JavaScript, React, Node.js for 4M+ learners. Reduced technical errors by 25% through structured feedback.'
  },
  {
    title: 'Desi Destiny',
    subtitle: 'Frontend Developer Intern (Sept 2025 - Present) | Navi Mumbai',
    desc: 'Redesigned the company website using React and Tailwind CSS, improving responsiveness and performance. Developed reusable frontend components.'
  },
  {
    title: 'ITM Skills University',
    subtitle: 'B.Tech in CSE (Aug 2024 - July 2028) | Mumbai',
    desc: 'CGPA: 8.99/10. Focus on Software Engineering, Data Structures, and Cloud Computing.'
  }
];
$('.service-three-item').each((i, el) => {
  if (i < expItems.length) {
    $(el).find('.service-three-item-title a').text(expItems[i].title);
    // Replace text inside paragraphs
    $(el).find('.service-three-item-paragraph').text(expItems[i].desc);
    // Add subtitle if possible, or just prepend it to desc
    $(el).find('.service-three-item-paragraph').prepend(`<strong>${expItems[i].subtitle}</strong><br/>`);
  } else {
    $(el).parent().remove(); // Remove extra service cards
  }
});

// 4. Update Portfolio -> Projects
$('.portfolio-three-title').text('My Projects');
const projects = [
  {
    title: 'Sahayak Navigator',
    category: 'Assistive Navigation System',
    desc: 'Voice-guided system for visually impaired users with real-time obstacle detection using OpenCV, Voice API, and AWS.'
  },
  {
    title: 'Data Migration CLI Tool',
    category: 'Backend / DevOps',
    desc: 'Node.js CLI automating PostgreSQL-to-AWS migration cutting time by 40%. Implemented AES encryption and S3 storage.'
  }
];

$('.portfolio-three-item').each((i, el) => {
  if (i < projects.length) {
    $(el).find('.portfolio-three-item-title a').text(projects[i].title);
    $(el).find('.portfolio-three-item-category a').text(projects[i].category);
    // Remove the image src and put a placeholder or just leave it
  } else {
    $(el).parent().remove(); // Remove extra portfolio cards
  }
});

// 5. Hide or Repurpose Testimonial -> Achievements
$('.testimonial-three-title').text('Achievements');
const achievements = [
  {
    name: 'HackWithMumbai 2.0 Winner',
    desc: 'Secured 1st place among 200+ teams for building an AI-powered assistive navigation product.'
  },
  {
    name: '3x National Hackathon Finalist',
    desc: 'Recognised as finalist across three competitive national-level hackathons in full-stack and AI/ML tracks.'
  }
];

$('.testimonial-three-item').each((i, el) => {
  if (i < achievements.length) {
    $(el).find('.testimonial-three-author-name').text(achievements[i].name);
    $(el).find('.testimonial-three-paragraph').text(achievements[i].desc);
    $(el).find('.testimonial-three-author-designation').text('');
  } else {
    // try to remove the slide
    $(el).closest('.swiper-slide').remove();
  }
});

// 6. Technical Skills - update brand area if exists
// Just hide brand area for now to keep it simple, or update headings
$('.brand-three-area').remove();
$('.pricing-three-area').remove(); // Hide pricing if exists
$('.blog-three-area').remove(); // Hide blog if exists

fs.writeFileSync(htmlPath, $.html());
console.log("Successfully updated index.html with resume data.");
