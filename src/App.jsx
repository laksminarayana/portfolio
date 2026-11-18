import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Award, Binary, Braces, BriefcaseBusiness, CheckCircle2,
  ChevronRight, Code2, Cpu, Database, Mail, MapPin, Menu, MessageCircle,
  Network, Rocket, Send, Server, Terminal, Trophy, Workflow, X
} from 'lucide-react'
import {
  SiApachekafka, SiDjango, SiDocker, SiExpress,
  SiFlask, SiGit, SiGithubactions, SiHtml5, SiJavascript, SiLinux, SiMysql,
  SiNodedotjs, SiNumpy, SiPandas, SiPython, SiReact, SiRedis, SiScikitlearn,
  SiTailwindcss
} from 'react-icons/si'
import { FaJava, FaDatabase, FaMicrosoft, FaWhatsapp, FaGithub, FaLinkedinIn, FaAws, FaChartBar, FaCss3Alt } from 'react-icons/fa'
import { TbAi, TbBrandCpp, TbBrandLeetcode, TbMessageLanguage, TbServerBolt } from 'react-icons/tb'
import { SiCisco, SiHackerrank } from 'react-icons/si'
import profileImage from './assets/profile.jpeg'
import './App.css'
import './ambient.css'
import './project-modal.css'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || ''
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
const socials = {
  github: 'https://github.com/laksminarayana',
  linkedin: 'https://www.linkedin.com/in/37a15b2a9/',
  leetcode: 'https://leetcode.com/u/misalavenkatalakshminarayana/',
  email: contactEmail ? `mailto:${contactEmail}` : '',
}

const brandColors = {
  'Alzheimer Prediction Research': '#3776ab',
  'AWS Academy': '#ff9900',
  'AWS S3': '#ff9900',
  Azure: '#0078d4',
  'C++': '#00599c',
  Cisco: '#049fd9',
  CSS3: '#1572b6',
  Django: '#44b78b',
  Docker: '#2496ed',
  Express: '#f5f5f5',
  Flask: '#f5f5f5',
  'Generative AI': '#8b5cf6',
  Git: '#f05032',
  'GitHub Actions': '#2088ff',
  GitHub: '#f0f6fc',
  HackerRank: '#00ea64',
  HTML5: '#e34f26',
  Java: '#ed8b00',
  JavaScript: '#f7df1e',
  Kafka: '#ffffff',
  'Machine Learning': '#f7931e',
  'Microsoft SQL Server': '#cc2927',
  MySQL: '#4479a1',
  NLP: '#8b5cf6',
  'Node.js': '#5fa04e',
  NumPy: '#4dabcf',
  Pandas: '#a78bfa',
  Python: '#3776ab',
  React: '#61dafb',
  Redis: '#ff4438',
  'REST APIs': '#64d8cb',
  'Scikit-learn': '#f7931e',
  SQL: '#77a8ff',
  'SQL Server': '#cc2927',
  'Tailwind': '#38bdf8',
}

function TechIcon({ icon: Icon, name, className }) {
  return <Icon className={className} title={name} aria-label={name} style={{ color: brandColors[name] || '#b7c4d7' }} />
}

const projects = [
  { slug:'distributed-task-processing', title:'Distributed Task Processing System', type:'Distributed Systems', description:'A resilient Kafka-based task engine distributing high-throughput workloads across containerized workers.', tech:['Python','Kafka','Docker','Flask','Redis','SQL Server'], icons:[SiPython,SiApachekafka,SiDocker,SiFlask,SiRedis,FaMicrosoft], features:['10,000+ tasks processed','Approximately 300 tasks per second','Distributed across four worker containers','99.5% task completion','Retries, backoff & dead-letter handling'] },
  { slug:'student-management-portal', title:'Student Management Portal', type:'Full-Stack Platform', description:'A role-aware management platform for students and teachers with a normalized reporting database.', tech:['Node.js','Express','JavaScript','SQL Server'], icons:[SiNodedotjs,SiExpress,SiJavascript,FaMicrosoft], features:['Role-based access control','8-table database schema','Report load time improved from 2.4s to 0.4s'] },
  { slug:'serverless-etl-pipeline', title:'Serverless ETL Pipeline', type:'Cloud Data Engineering', description:'An event-driven AWS pipeline that extracts, transforms, and visualizes large-scale datasets.', tech:['Python','AWS S3','Lambda','SQL','Power BI'], icons:[SiPython,FaAws,TbServerBolt,FaDatabase,FaChartBar], features:['Processed 100,000+ records','Automated extraction and transformation','Created Power BI dashboards'] },
  { slug:'skill-gap-analyzer', title:'Skill Gap Analyzer', type:'AI Product', description:'An NLP-powered platform that compares candidate skills with role requirements and identifies learning gaps.', tech:['Django','React','Machine Learning','NLP','Tailwind'], icons:[SiDjango,SiReact,SiScikitlearn,SiTailwindcss], features:['NLP-based skill extraction','Machine-learning gap analysis','Role-oriented recommendations'] },
  { slug:'alzheimer-prediction', title:'Alzheimer Prediction Research', type:'Applied ML Research', description:'A predictive machine-learning study using clinical features and explainability techniques.', tech:['Python','Machine Learning','Gradient Boosting','SHAP'], icons:[SiPython,SiScikitlearn,SiPandas,SiNumpy], features:['Worked with 35 features','Gradient boosting predictive model','SHAP model explainability'] },
  { slug:'food-delivery-system', title:'Event-Driven Food Delivery', type:'Distributed Architecture', description:'A containerized food delivery architecture communicating through durable Kafka events.', tech:['Python','Kafka','Docker','SQL Server'], icons:[SiPython,SiApachekafka,SiDocker,SiMysql], features:['Event-driven service architecture','Kafka-based communication','Containerized deployment'] },
]

const skillGroups = [
  { title:'Languages', skills:[['Python',SiPython],['Java',FaJava],['C++',TbBrandCpp],['JavaScript',SiJavascript],['SQL',FaDatabase],['HTML5',SiHtml5],['CSS3',FaCss3Alt]] },
  { title:'Backend & Frameworks', skills:[['Node.js',SiNodedotjs],['Express.js',SiExpress],['Flask',SiFlask],['Django',SiDjango],['REST APIs',TbServerBolt]] },
  { title:'Databases', skills:[['MySQL',SiMysql],['Microsoft SQL Server',FaMicrosoft],['Redis',SiRedis]] },
  { title:'Cloud & DevOps', skills:[['AWS',FaAws],['Azure',FaMicrosoft],['Docker',SiDocker],['Kafka',SiApachekafka],['Git',SiGit],['GitHub Actions',SiGithubactions],['Linux',SiLinux]] },
  { title:'AI & Machine Learning', skills:[['Machine Learning',SiScikitlearn],['NLP',TbMessageLanguage],['Generative AI',TbAi],['Scikit-learn',SiScikitlearn],['Pandas',SiPandas],['NumPy',SiNumpy]] },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top:0, behavior:'smooth' })
  }, [pathname])
  return null
}

function Navbar() {
  const [open,setOpen] = useState(false)
  const [scrolled,setScrolled] = useState(false)
  const links=[['/','Home'],['/about','About'],['/skills','Skills'],['/projects','Projects'],['/experience','Experience'],['/achievements','Achievements'],['/contact','Contact']]
  useEffect(() => {
    const handler=()=>setScrolled(window.scrollY>24)
    window.addEventListener('scroll',handler)
    return ()=>window.removeEventListener('scroll',handler)
  },[])
  return (
    <header className={`navbar ${scrolled?'scrolled':''}`}>
      <Link className="brand" to="/" aria-label="Lakshmi Narayana home"><span className="brand-mark">LN</span><span className="brand-name">Lakshmi Narayana</span></Link>
      <nav className={`nav-links ${open?'open':''}`} aria-label="Primary navigation">
        {links.map(([to,label])=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)}>{label}</NavLink>)}
      </nav>
      <Link className="nav-cta" to="/contact">Hire me <ArrowRight size={15}/></Link>
      <button className="menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open?<X/>:<Menu/>}</button>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div><Link className="brand" to="/"><span className="brand-mark">LN</span></Link><p>Building scalable solutions. Engineering the future.</p></div>
        <div><h3>Navigate</h3><div className="footer-links"><Link to="/about">About</Link><Link to="/skills">Skills</Link><Link to="/projects">Projects</Link><Link to="/contact">Contact</Link></div></div>
        <div><h3>Connect</h3><div className="social-row"><a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub/></a><a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn/></a><a href={socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><TbBrandLeetcode/></a>{contactEmail&&<a href={socials.email} aria-label="Email"><Mail/></a>}</div>{contactEmail?<a className="footer-email" href={socials.email}>{contactEmail}</a>:<Link className="footer-email" to="/contact">Use the contact form</Link>}</div>
      </div>
      <div className="footer-bottom"><span>© 2026 Venkata Lakshmi Narayana Misala</span><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div>
    </footer>
  )
}

function PageShell({children,eyebrow,title,intro}) {
  return <main>{(eyebrow||title)&&<motion.section className="page-heading" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{intro&&<p>{intro}</p>}</motion.section>} {children}</main>
}

function Reveal({children,className='',delay=0}) {
  return <motion.div className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.55,delay}}>{children}</motion.div>
}

function ProjectCard({project,onOpen}) {
  return (
    <article className="project-card">
      <button className="project-preview project-preview-button" type="button" onClick={()=>onOpen(project)} aria-label={`View details for ${project.title}`}>
        <div className="preview-grid"/>
        <div className="preview-window"><div className="window-bar"><i/><i/><i/></div><div className="window-content">{project.icons.slice(0,4).map((Icon,i)=><TechIcon key={i} icon={Icon} name={project.tech[i]}/>)}</div></div>
      </button>
      <div className="project-body"><span className="project-eyebrow">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tech-row">{project.icons.map((Icon,i)=><TechIcon key={i} icon={Icon} name={project.tech[i]}/>)}</div><div className="project-actions"><button className="text-link project-detail-button" type="button" onClick={()=>onOpen(project)}>View details <ChevronRight size={15}/></button><button className="icon-button" title="Repository link unavailable" disabled aria-label="Repository unavailable"><FaGithub/></button></div></div>
    </article>
  )
}

function ProjectDialog({project,onClose}) {
  const dialogRef=useRef(null)

  useEffect(()=>{
    const previousFocus=document.activeElement
    const previousOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    dialogRef.current?.focus()

    const handleKeyDown=event=>{
      if(event.key==='Escape'){
        onClose()
        return
      }
      if(event.key!=='Tab') return
      const focusable=dialogRef.current?.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')
      if(!focusable?.length) return
      const first=focusable[0]
      const last=focusable[focusable.length-1]
      if(event.shiftKey&&document.activeElement===first){
        event.preventDefault()
        last.focus()
      }else if(!event.shiftKey&&document.activeElement===last){
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown',handleKeyDown)
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown)
      document.body.style.overflow=previousOverflow
      if(previousFocus instanceof HTMLElement&&previousFocus.isConnected) previousFocus.focus()
    }
  },[onClose])

  return (
    <motion.div className="project-modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={event=>{if(event.target===event.currentTarget) onClose()}}>
      <motion.section
        ref={dialogRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        initial={{opacity:0,scale:.96,y:14}}
        animate={{opacity:1,scale:1,y:0}}
        exit={{opacity:0,scale:.96,y:10}}
        transition={{duration:.2}}
      >
        <div className="project-modal-header">
          <div><span className="eyebrow">{project.type}</span><h2 id="project-modal-title">{project.title}</h2></div>
          <button className="project-modal-close" type="button" onClick={onClose} aria-label="Close project details"><X/></button>
        </div>
        <p className="project-modal-description">{project.description}</p>
        <div className="project-modal-section">
          <h3>Technology</h3>
          <div className="project-modal-tech">{project.icons.map((Icon,index)=><span className="project-modal-tech-item" key={`${project.tech[index]}-${index}`}><TechIcon icon={Icon} name={project.tech[index]}/>{project.tech[index]}</span>)}</div>
        </div>
        <div className="project-modal-section">
          <h3>Highlights</h3>
          <ul className="project-modal-features">{project.features.map(feature=><li key={feature}><CheckCircle2/>{feature}</li>)}</ul>
        </div>
        <div className="project-modal-footer"><span><FaGithub/> Repository link not provided</span><span><Rocket/> No live demo provided</span></div>
      </motion.section>
    </motion.div>
  )
}

function Home({onOpenProject}) {
  const navigate=useNavigate()
  return <PageShell>
    <section className="hero-section"><div className="hero-grid">
      <motion.div className="hero-copy" initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:.7}}>
        <div className="availability"><span/> Available for opportunities</div>
        <h1>Building Scalable Solutions.<br/><span>Engineering the Future.</span></h1>
        <p className="hero-lead">I'm a passionate Software Development Engineer who enjoys building scalable applications, solving challenging problems, exploring distributed systems, and developing intelligent solutions using AI and modern technologies.</p>
        <div className="hero-actions"><Link className="button primary" to="/projects">Explore My Work <ArrowRight size={18}/></Link><Link className="button secondary" to="/contact">Let's Connect <MessageCircle size={18}/></Link></div>
        <div className="hero-meta"><span><MapPin size={16}/> India</span><span><BriefcaseBusiness size={16}/> Open to SDE roles</span></div>
      </motion.div>
      <motion.div className="hero-visual" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.1}}>
        <div className="visual-grid"/><div className="profile-frame"><img src={profileImage} alt="Venkata Lakshmi Narayana Misala"/><div className="code-label"><span>const</span> developer = <b>"Lakshmi"</b>;</div></div>
        <div className="tech-orb orb-one"><TechIcon icon={SiReact} name="React"/></div><div className="tech-orb orb-two"><TechIcon icon={SiPython} name="Python"/></div><div className="tech-orb orb-three"><TechIcon icon={SiDocker} name="Docker"/></div><div className="tech-orb orb-four"><TechIcon icon={FaAws} name="AWS S3"/></div>
      </motion.div>
    </div></section>
    <section className="section"><Reveal className="section-heading split"><div><span className="eyebrow">Selected work</span><h2>Projects built for impact</h2></div><Link className="text-link" to="/projects">View all projects <ArrowRight size={16}/></Link></Reveal><div className="project-grid">{projects.slice(0,3).map((project,i)=><Reveal key={project.slug} delay={i*.08}><ProjectCard project={project} onOpen={onOpenProject}/></Reveal>)}</div></section>
    <section className="section"><Reveal className="stats-grid"><div className="stat"><strong>400+</strong><span>LeetCode problems</span></div><div className="stat"><strong>10K+</strong><span>Tasks processed</span></div><div className="stat"><strong>100K+</strong><span>Records in ETL pipeline</span></div><div className="stat"><strong>99.5%</strong><span>Task completion</span></div></Reveal></section>
    <section className="section"><Reveal className="cta-panel"><div><span className="eyebrow">Let's build together</span><h2>Have a problem worth solving?</h2><p>I'm interested in software engineering, distributed systems, cloud, and AI opportunities.</p></div><button className="button primary" onClick={()=>navigate('/contact')}>Start a conversation <ArrowRight size={18}/></button></Reveal></section>
  </PageShell>
}

function About() {
  const journey=[
    ['2024','AI & ML Exploration','Started deepening work across machine learning, NLP, explainable AI, and applied research.'],
    ['2025','Cloud & Engineering','Earned cloud credentials and built serverless and distributed data systems.'],
    ['2026','Data Engineering Internship','Worked with 50,000+ rows of data and improved query performance by approximately 40%.'],
    ['2027','Graduate','Complete a B.Tech in Computer Science and Engineering at R.V.R. & J.C. College of Engineering.'],
  ]
  return <PageShell eyebrow="About me" title="Engineer. Builder. Problem solver." intro="I combine software craftsmanship with curiosity for systems, data, cloud, and intelligent applications.">
    <section className="section about-grid"><Reveal className="about-card glass-card"><span className="eyebrow">Professional introduction</span><h2>Turning complex problems into dependable systems.</h2><p>I am a Computer Science undergraduate based in India, passionate about scalable applications and understanding how technology works beneath the surface.</p><p>My interests span distributed systems, full-stack engineering, data engineering, machine learning, and generative AI. I value clean architecture, measurable performance, and solutions that remain practical as they scale.</p><div className="tag-row"><span>Problem solving</span><span>System design</span><span>Continuous learning</span></div></Reveal><Reveal className="education-card glass-card" delay={.1}><div className="education-icon"><Award/></div><span className="eyebrow">Education</span><h3>B.Tech in Computer Science and Engineering</h3><p>R.V.R. & J.C. College of Engineering</p><div className="education-footer"><span>2027</span><span>Graduation</span></div></Reveal></section>
    <section className="section"><Reveal className="section-heading"><span className="eyebrow">My journey</span><h2>Learning in motion</h2></Reveal><div className="timeline">{journey.map(([year,title,text],i)=><Reveal className="timeline-item" key={year} delay={i*.06}><div className="timeline-year">{year}</div><div className="timeline-dot"/><div className="timeline-content"><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></section>
  </PageShell>
}

function Skills() {
  return <PageShell eyebrow="Skills & technologies" title="My technical toolkit" intro="A practical stack for building reliable applications, distributed systems, and intelligent products.">
    <section className="section">{skillGroups.map((group,i)=><Reveal className="skill-section" key={group.title} delay={i*.04}><div className="skill-section-heading"><div className="skill-section-icon"><Terminal/></div><h2>{group.title}</h2></div><div className="skill-grid">{group.skills.map(([name,Icon])=><motion.div className="skill-card" key={name} whileHover={{y:-6}}><TechIcon icon={Icon} name={name}/><span>{name}</span></motion.div>)}</div></Reveal>)}
      <Reveal className="cs-card"><div><span className="eyebrow">Computer Science</span><h2>Strong engineering foundations</h2></div><div className="tag-cloud">{['Data Structures & Algorithms','Object-Oriented Programming','Operating Systems','DBMS','Computer Networks','System Design','CI/CD'].map(item=><span key={item}>{item}</span>)}</div></Reveal>
    </section>
  </PageShell>
}

function Projects({onOpenProject}) {
  return <PageShell eyebrow="Project archive" title="Selected engineering work" intro="Systems, applications, and research projects spanning distributed computing, cloud, full-stack development, and machine learning."><section className="section"><div className="project-grid">{projects.map((project,i)=><Reveal key={project.slug} delay={(i%3)*.06}><ProjectCard project={project} onOpen={onOpenProject}/></Reveal>)}</div></section></PageShell>
}

function ProjectDetail() {
  const {slug}=useParams()
  const project=projects.find(item=>item.slug===slug)
  if(!project) return <PageShell eyebrow="404" title="Project not found" intro="This project does not exist in the archive."/>
  return <main className="detail-page"><section className="detail-hero"><Link className="text-link back-link" to="/projects"><ArrowLeft size={16}/> All projects</Link><span className="eyebrow">{project.type}</span><h1>{project.title}</h1><p>{project.description}</p></section><section className="section detail-layout"><Reveal className="architecture-card glass-card"><div className="architecture-top"><span>System architecture</span><span className="status-dot">Concept preview</span></div><div className="architecture-canvas">{project.icons.slice(0,5).map((Icon,i)=><div className="architecture-node" key={i}><TechIcon icon={Icon} name={project.tech[i]}/><span>{project.tech[i]}</span></div>)}</div></Reveal><Reveal className="detail-sidebar"><div className="glass-card detail-info"><h3>Technology</h3><div className="tag-row">{project.tech.map(item=><span key={item}>{item}</span>)}</div></div><div className="glass-card detail-info"><h3>Repository</h3><button className="button secondary full" disabled><FaGithub/> Repository placeholder</button></div><div className="glass-card detail-info"><h3>Live demo</h3><button className="button secondary full" disabled><Rocket size={17}/> No demo available</button></div></Reveal></section><section className="section detail-content"><Reveal><span className="eyebrow">What shipped</span><h2>Key implementation highlights</h2></Reveal><div className="feature-list">{project.features.map(feature=><Reveal className="feature-row" key={feature}><CheckCircle2/><span>{feature}</span></Reveal>)}</div></section></main>
}

function Experience() {
  const certificates=[
    ['AWS Cloud Practitioner','2025','AWS Academy',FaAws,'AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20261017-19-3lr6r6.pdf'],
    ['AWS Academy Data Engineering','2026','AWS Academy',FaAws,'AWS_Academy_Graduate___Data_Engineering___Training_Badge_Badge20261017-19-ah4eki.pdf'],
    ['Python Essentials','2026','Cisco',SiCisco,'PythonEssentials1Update20261017-19-60bcn3.pdf'],
    ['Problem Solving Intermediate','2026','HackerRank',SiHackerrank,'problem_solving_intermediate certificate.pdf'],
    ['Software Engineer','2026','HackerRank',SiHackerrank,'software_engineer certificate.pdf'],
    ['SQL Advanced','2026','HackerRank',SiHackerrank,'sql_advanced certificate.pdf'],
  ]
  return <PageShell eyebrow="Experience & certifications" title="Building skills through real work" intro="Hands-on data engineering experience and focused professional learning.">
    <section className="section"><Reveal className="section-heading"><span className="eyebrow">Experience</span><h2>Professional timeline</h2></Reveal><Reveal className="experience-card"><div className="experience-date">Apr – Jun 2026</div><div className="experience-marker"><BriefcaseBusiness/></div><div><h3>Data Engineering Intern</h3><span>Professional Experience</span><p>Worked with 50,000+ rows of data and improved query performance by approximately 40% through analysis and optimization.</p></div></Reveal></section>
    <section className="section"><Reveal className="section-heading"><span className="eyebrow">Credentials</span><h2>Certificates</h2></Reveal><div className="certificate-grid">{certificates.map(([name,year,category,Logo,file],i)=><Reveal key={name} delay={i*.05}><a className="certificate-card" href={`${import.meta.env.BASE_URL}certificates/${encodeURIComponent(file)}`} target="_blank" rel="noreferrer"><div className="certificate-art"><Logo className="certificate-logo" aria-label={`${category} logo`} style={{fontSize:'58px',color:brandColors[category]||'#b6a8ee',filter:'drop-shadow(0 0 18px currentColor)'}}/><div className="certificate-lines"><span/><span/><span/></div></div><div className="certificate-body"><span>{category}</span><h3>{name}</h3><p>{year} · View certificate ↗</p></div></a></Reveal>)}</div></section>
  </PageShell>
}

function Achievements() {
  const items=[
    ['1st','Anti-Ragging Short Film',Trophy,'First Prize'],
    ['2nd','Web Mantra',Award,'Second Prize'],
    ['3rd','Deploy It 2026',Rocket,'Third Prize'],
  ]
  return <PageShell eyebrow="Achievements" title="Recognition beyond the keyboard" intro="Technical competitions, creative work, and consistent problem-solving practice."><section className="section achievement-grid">{items.map(([place,title,Icon,detail],i)=><Reveal key={title} delay={i*.08}><article className="achievement-card"><div className="achievement-place">{place}</div><Icon/><span>{detail}</span><h3>{title}</h3></article></Reveal>)}<Reveal delay={.24}><article className="achievement-card leetcode-card"><TbBrandLeetcode/><strong>400+</strong><span>Problems solved</span><h3>LeetCode</h3></article></Reveal></section><section className="section"><Reveal className="coding-grid"><div><span className="eyebrow">Coding profiles</span><h2>Practice. Compete. Improve.</h2></div><div className="profile-links"><a href={socials.github} target="_blank" rel="noreferrer"><FaGithub/><span><b>GitHub</b><small>View repositories</small></span><ArrowRight/></a><a href={socials.leetcode} target="_blank" rel="noreferrer"><TbBrandLeetcode/><span><b>LeetCode</b><small>400+ problems</small></span><ArrowRight/></a></div></Reveal></section></PageShell>
}

function Contact() {
  const [status,setStatus]=useState('')
  const submit=async event=>{
    event.preventDefault()
    const form=event.currentTarget
    const data=Object.fromEntries(new FormData(form).entries())
    const endpoint=import.meta.env.VITE_CONTACT_ENDPOINT
    if(endpoint){
      try{
        setStatus('Sending...')
        const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
        if(!response.ok) throw new Error('Delivery failed')
        setStatus('Message sent successfully.')
        form.reset()
      }catch{
        setStatus('Unable to send right now. Please use the email or WhatsApp contact option.')
      }
    }else if(contactEmail){
      const subject=encodeURIComponent(data.subject||'Portfolio inquiry')
      const body=encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
      window.location.href=`mailto:${contactEmail}?subject=${subject}&body=${body}`
      setStatus('Opening your email application...')
    }else{
      setStatus('Contact is not configured yet. Add VITE_CONTACT_ENDPOINT or VITE_CONTACT_EMAIL in .env.local.')
    }
  }
  const whatsappInquiry=event=>{
    event.preventDefault()
    if(!whatsappNumber){
      setStatus('WhatsApp is not configured yet. Add VITE_WHATSAPP_NUMBER in .env.local.')
      return
    }
    const form=event.currentTarget.closest('form')
    if(!form?.reportValidity()) return
    const data=Object.fromEntries(new FormData(form).entries())
    const inquiry=`Hi Lakshmi, I'm ${data.name} (${data.email}).\n\nSubject: ${data.subject}\n\n${data.message}`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiry)}`,'_blank','noopener,noreferrer')
  }
  return <PageShell eyebrow="Contact" title="Let’s create something meaningful" intro="Have an opportunity, project, or technical question? I’d be glad to hear about it."><section className="section contact-grid"><Reveal className="contact-form-card glass-card"><form onSubmit={submit}><div className="form-row"><label>Name<input id="contact-name" name="name" type="text" placeholder="Your name" required/></label><label>Email<input id="contact-email" name="email" type="email" placeholder="you@example.com" required/></label></div><label>Subject<input name="subject" type="text" placeholder="What would you like to discuss?" required/></label><label>Message<textarea id="contact-message" name="message" rows="7" placeholder="Tell me about your project or opportunity..." required/></label><div className="form-actions"><button className="button primary" type="submit">Send message <Send size={17}/></button><button className="button whatsapp" type="button" onClick={whatsappInquiry}><FaWhatsapp/> WhatsApp inquiry</button></div>{status&&<p className="form-status" role="status">{status}</p>}</form></Reveal><Reveal className="contact-aside" delay={.08}><div className="glass-card contact-method"><div className="contact-icon"><Mail/></div><div><span>Email</span>{contactEmail?<a href={socials.email}>{contactEmail}</a>:<p>Configure contact email</p>}</div></div><div className="glass-card contact-method"><div className="contact-icon"><MapPin/></div><div><span>Location</span><p>India</p></div></div><div className="glass-card contact-method"><div className="contact-icon"><FaWhatsapp/></div><div><span>WhatsApp</span>{whatsappNumber?<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">Start a conversation</a>:<p>Configure WhatsApp number</p>}</div></div><div className="contact-socials"><a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub/></a><a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn/></a><a href={socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><TbBrandLeetcode/></a></div></Reveal></section></PageShell>
}

function App() {
  const location=useLocation()
  const [selectedProject,setSelectedProject]=useState(null)
  const closeProject=useCallback(()=>setSelectedProject(null),[])
  return <><div className="ambient-backdrop" aria-hidden="true"><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="ambient ambient-three"/><div className="ambient ambient-four"/><div className="tool-float tool-cpu"><Cpu/></div><div className="tool-float tool-code"><Code2/></div><div className="tool-float tool-db"><Database/></div><div className="tool-float tool-terminal"><Terminal/></div><div className="tool-float tool-network"><Network/></div><div className="tool-float tool-braces"><Braces/></div><div className="tool-float tool-server"><Server/></div><div className="tool-float tool-workflow"><Workflow/></div><div className="tool-float tool-binary"><Binary/></div></div><ScrollToTop/><Navbar/><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.22}}><Routes location={location}><Route path="/" element={<Home onOpenProject={setSelectedProject}/>}/><Route path="/about" element={<About/>}/><Route path="/skills" element={<Skills/>}/><Route path="/projects" element={<Projects onOpenProject={setSelectedProject}/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/experience" element={<Experience/>}/><Route path="/achievements" element={<Achievements/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<PageShell eyebrow="404" title="Page not found" intro="The page you requested is outside this portfolio."/>}/></Routes></motion.div></AnimatePresence><AnimatePresence>{selectedProject&&<ProjectDialog project={selectedProject} onClose={closeProject}/>}</AnimatePresence><Footer/></>
}

export default App
