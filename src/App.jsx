import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home","About","Skills","Projects","Experience","Contact"];

const SKILLS = {
  Frontend: [
    { name:"React.js", icon:"⚛️" },
    { name:"HTML5", icon:"🌐" },
    { name:"CSS3", icon:"🎨" },
    { name:"JavaScript", icon:"🟨" },
  ],
  Backend: [
    { name:"Node.js", icon:"🟩" },
    { name:"Express.js", icon:"🚂" },
    { name:"ASP.NET", icon:"🔷" },
  ],
  Database: [
    { name:"MongoDB", icon:"🍃" },
    { name:"MySQL", icon:"🐬" },
  ],
  Tools: [
    { name:"Git", icon:"🔀" },
    { name:"GitHub", icon:"🐙" },
    { name:"VS Code", icon:"💙" },
    { name:"Visual Studio", icon:"🟣" },
  ],
};

const PROJECTS = [
  {
    name: "SwadistChai",
    emoji: "🍵",
    desc: "Full-stack artisan tea e-commerce website with product catalog, responsive UI and complete MERN Stack architecture.",
    tech: ["MongoDB","Express.js","React.js","Node.js"],
    live: "https://swadistchai.onrender.com",
    github: null,
    badge: "Live",
    badgeColor: "bg-green-500",
  },
  {
    name: "HealthLive",
    emoji: "💊",
    desc: "Pharmacy e-commerce web application for ordering medicines online with product listings, cart & database management.",
    tech: ["ASP.NET (C#)","HTML","CSS","JavaScript","MySQL"],
    live: null,
    github: null,
    badge: "Preparing Deployment",
    badgeColor: "bg-yellow-500",
  },
];

const EXPERIENCE = [
  {
    company: "PaulTech Software Services (OPC) Pvt. Ltd.",
    role: "Web Development Intern",
    period: "Feb 2026 – Apr 2026",
    location: "Jamshedpur, Jharkhand",
    stack: "MERN Stack",
    points: [
      "Built SwadistChai — full-stack artisan tea e-commerce website",
      "Deployed live production app on Render platform",
      "Tech: MongoDB, Express.js, React.js, Node.js",
    ],
    cert: "PSS/848/2026",
  },
  {
    company: "Generix InfoTech",
    role: "Web Development Intern",
    period: "Jun 2025 – Sep 2025",
    location: "Jamshedpur, Jharkhand",
    stack: "ASP.NET",
    points: [
      "Built HealthLive — pharmacy e-commerce web application",
      "Implemented product listings, cart & MySQL database",
      "Tech: ASP.NET (C#), HTML, CSS, JavaScript, MySQL",
    ],
    cert: "GEN/2025/C62",
  },
];

// ─── STARS ───────────────────────────────────────────────────────────
function Stars() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const stars = Array.from({length:180},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.5+0.3,
      a:Math.random(), da:Math.random()*0.005+0.002
    }));
    let raf;
    function draw(){
      ctx.clearRect(0,0,W,H);
      stars.forEach(s=>{
        s.a+=s.da; if(s.a>1||s.a<0) s.da*=-1;
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,212,255,${s.a*0.7})`;
        ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    }
    draw();
    const onResize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",onResize);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);};
  },[]);
  return <canvas ref={canvasRef} id="stars"/>;
}

// ─── TYPING ──────────────────────────────────────────────────────────
function TypingText({texts}){
  const [idx,setIdx]=useState(0);
  const [sub,setSub]=useState("");
  const [del,setDel]=useState(false);
  useEffect(()=>{
    const t=texts[idx];
    if(!del&&sub.length<t.length){
      const id=setTimeout(()=>setSub(t.slice(0,sub.length+1)),80);
      return ()=>clearTimeout(id);
    } else if(!del&&sub.length===t.length){
      const id=setTimeout(()=>setDel(true),2000);
      return ()=>clearTimeout(id);
    } else if(del&&sub.length>0){
      const id=setTimeout(()=>setSub(sub.slice(0,-1)),40);
      return ()=>clearTimeout(id);
    } else if(del&&sub.length===0){
      setDel(false);setIdx((idx+1)%texts.length);
    }
  },[sub,del,idx,texts]);
  return <span className="text-glow" style={{color:"#00d4ff"}}>{sub}<span className="typing-cursor"/></span>;
}

// ─── FADE IN WRAPPER ─────────────────────────────────────────────────
function FadeIn({children,delay=0}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current;
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting) el.classList.add("visible");
    },{threshold:0.1});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return <div ref={ref} className="fade-in" style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────
function Navbar(){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  const scroll=(id)=>{
    document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});
    setOpen(false);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{background:scrolled?"rgba(10,15,30,0.95)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?"1px solid rgba(0,212,255,0.1)":"none"}}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/mihir.jpg"
           style={{width:42, height:42, borderRadius:"50%",
           border:"2px solid #00d4ff",
           objectFit:"cover"}}/>
          <span style={{fontFamily:"Poppins",fontWeight:700,color:"#00d4ff",fontSize:18}}>Mihir Giri</span>
        </div>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l=>(
            <button key={l} onClick={()=>scroll(l)} className="nav-link text-sm font-medium"
              style={{fontFamily:"Poppins",color:"#cbd5e1",background:"none",border:"none",cursor:"pointer"}}>
              {l}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={()=>setOpen(!open)}
          style={{background:"none",border:"none",cursor:"pointer",color:"#00d4ff",fontSize:24}}>
          {open?"✕":"☰"}
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {open&&(
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
            style={{background:"rgba(10,15,30,0.98)",borderBottom:"1px solid rgba(0,212,255,0.1)"}}>
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map(l=>(
                <button key={l} onClick={()=>scroll(l)}
                  style={{fontFamily:"Poppins",color:"#cbd5e1",background:"none",border:"none",cursor:"pointer",
                    textAlign:"left",fontSize:16,fontWeight:500}}>
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────
function Hero(){
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-6"
      style={{zIndex:1}}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
          {/* Avatar placeholder */}
          <img src="/mihir.jpg"
          style={{width:110, height:110,
          borderRadius:"50%",
          border:"3px solid #00d4ff",
          objectFit:"cover",
          boxShadow:"0 0 30px rgba(0,212,255,0.3)",
          margin:"0 auto 20px",
          display:"block"}}
        />
          <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,letterSpacing:4,
            textTransform:"uppercase",fontSize:13,marginBottom:16}}>
            Hello, I'm
          </p>
          <h1 style={{fontSize:"clamp(2.5rem,6vw,4.5rem)",fontWeight:900,fontFamily:"Poppins",
            background:"linear-gradient(135deg,#fff 40%,#00d4ff)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            backgroundClip:"text",lineHeight:1.1,marginBottom:20}}>
            Mihir Giri
          </h1>
          <div style={{fontSize:"clamp(1.2rem,3vw,1.8rem)",fontWeight:600,fontFamily:"Poppins",
            minHeight:50,marginBottom:16}}>
            <TypingText texts={["Full Stack Developer","MERN Stack Developer","Web Developer"]}/>
          </div>
          <p style={{color:"#94a3b8",fontSize:16,marginBottom:40,fontFamily:"Inter"}}>
            BCA Final Year @ Srinath University &nbsp;|&nbsp; Open to Internships & Full-time Roles
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary" onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}>
              View Projects →
            </button>
            <a href="/mihir_resume.pdf" download>
              <button className="btn-outline">⬇ Download Resume</button>
            </a>
          </div>
          {/* Social */}
          <div className="flex gap-6 justify-center mt-10">
            {[
              {icon:"🐙",label:"GitHub",href:"https://github.com/MihirGiri"},
              {icon:"💼",label:"LinkedIn",href:"https://linkedin.com/in/mihir-giri"},
              {icon:"✉️",label:"Email",href:"mailto:mihirgiri2@gmail.com"},
              {icon:"📱",label:"WhatsApp",href:"https://wa.me/qr/T4VPZHXA6WUSF1"},
              {icon:"📸",label:"Instagram",href:"https://www.instagram.com/mihir_giri__?igsh=MTB0dnY0aDV5MTR2ZQ=="},
            ].map(s=>(
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                title={s.label}
                style={{fontSize:26,transition:"transform 0.2s",display:"block"}}
                onMouseEnter={e=>e.target.style.transform="scale(1.3) translateY(-4px)"}
                onMouseLeave={e=>e.target.style.transform="scale(1)"}>
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Scroll down */}
      <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",
        color:"#00d4ff",fontSize:13,fontFamily:"Poppins",opacity:0.7,
        display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
        <span>Scroll Down</span>
        <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:1.5}}>▼</motion.div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────
function About(){
  return (
    <section id="about" className="relative py-24 px-6" style={{zIndex:1}}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,letterSpacing:4,
              textTransform:"uppercase",fontSize:13,marginBottom:12}}>Who I Am</p>
            <h2 className="section-title">About Me</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={100}>
            <div className="glass p-8">
              <p style={{color:"#cbd5e1",lineHeight:1.9,fontSize:15.5,fontFamily:"Inter"}}>
                I'm a <span style={{color:"#00d4ff",fontWeight:600}}>BCA Final Year student</span> at
                Srinath University Jamshedpur, graduating in June 2026. I'm passionate about building
                modern web applications that solve real-world problems.
              </p>
              <br/>
              <p style={{color:"#cbd5e1",lineHeight:1.9,fontSize:15.5,fontFamily:"Inter"}}>
                Currently specializing in <span style={{color:"#00d4ff",fontWeight:600}}>MERN Stack
                development</span>, I have hands-on experience through two internships where I built
                and deployed live e-commerce projects.
              </p>
              <br/>
              <p style={{color:"#cbd5e1",lineHeight:1.9,fontSize:15.5,fontFamily:"Inter"}}>
                I love learning new technologies, building projects, and sharing my journey with the
                developer community on LinkedIn.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col gap-4">
              {[
                {icon:"🎓",title:"Education",desc:"BCA @ Srinath University, Jamshedpur (2023–2026)"},
                {icon:"💼",title:"2 Internships",desc:"PaulTech Software Services & Generix InfoTech"},
                {icon:"🚀",title:"Live Projects",desc:"SwadistChai deployed on Render platform"},
                {icon:"🏆",title:"Google Cloud Arcade Legend",desc:"Earned exclusive Google Cloud swag & badge"},
                {icon:"📍",title:"Location",desc:"Jamshedpur, Jharkhand | Open to relocate"},
              ].map((c,i)=>(
                <div key={i} className="glass p-4 flex gap-4 items-start"
                  style={{transition:"all 0.3s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#00d4ff"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,212,255,0.15)"}>
                  <span style={{fontSize:24,minWidth:36}}>{c.icon}</span>
                  <div>
                    <p style={{fontFamily:"Poppins",fontWeight:600,color:"#f1f5f9",fontSize:14}}>{c.title}</p>
                    <p style={{fontFamily:"Inter",color:"#94a3b8",fontSize:13,marginTop:2}}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────
function Skills(){
  return (
    <section id="skills" className="relative py-24 px-6" style={{zIndex:1}}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,letterSpacing:4,
              textTransform:"uppercase",fontSize:13,marginBottom:12}}>What I Know</p>
            <h2 className="section-title">Technical Skills</h2>
          </div>
        </FadeIn>
        {Object.entries(SKILLS).map(([cat,items],ci)=>(
          <FadeIn key={cat} delay={ci*100}>
            <div className="mb-10">
              <h3 style={{fontFamily:"Poppins",fontWeight:700,color:"#00d4ff",
                fontSize:13,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>
                — {cat}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.map((s,i)=>(
                  <div key={i} className="skill-badge">
                    <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
                    <p style={{fontFamily:"Poppins",fontWeight:600,fontSize:13,color:"#f1f5f9"}}>{s.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────
function Projects(){
  return (
    <section id="projects" className="relative py-24 px-6" style={{zIndex:1}}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,letterSpacing:4,
              textTransform:"uppercase",fontSize:13,marginBottom:12}}>What I've Built</p>
            <h2 className="section-title">Projects</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p,i)=>(
            <FadeIn key={i} delay={i*150}>
              <div className="project-card h-full flex flex-col">
                <div style={{padding:"28px 28px 0"}}>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{fontSize:36}}>{p.emoji}</span>
                    <span className={`${p.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
                      style={{fontFamily:"Poppins"}}>
                      {p.badge}
                    </span>
                  </div>
                  <h3 style={{fontFamily:"Poppins",fontWeight:800,fontSize:22,color:"#f1f5f9",marginBottom:12}}>
                    {p.name}
                  </h3>
                  <p style={{color:"#94a3b8",fontSize:14,lineHeight:1.8,fontFamily:"Inter",marginBottom:20}}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map((t,j)=>(
                      <span key={j} style={{background:"rgba(0,212,255,0.1)",border:"1px solid rgba(0,212,255,0.3)",
                        color:"#00d4ff",borderRadius:20,padding:"3px 12px",fontSize:12,
                        fontFamily:"Poppins",fontWeight:500}}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{padding:"0 28px 28px",marginTop:"auto",display:"flex",gap:12}}>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      <button className="btn-primary" style={{padding:"10px 20px",fontSize:13}}>
                        🌐 Live Demo
                      </button>
                    </a>
                  ) : (
                    <button className="btn-outline" style={{padding:"9px 20px",fontSize:13,opacity:0.6,cursor:"not-allowed"}}>
                      🔧 Coming Soon
                    </button>
                  )}
                  <button className="btn-outline" style={{padding:"9px 20px",fontSize:13,opacity:0.5,cursor:"not-allowed"}}
                    title="GitHub link will be added soon">
                    🐙 GitHub
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────
function Experience(){
  return (
    <section id="experience" className="relative py-24 px-6" style={{zIndex:1}}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,letterSpacing:4,
              textTransform:"uppercase",fontSize:13,marginBottom:12}}>My Journey</p>
            <h2 className="section-title">Internship Experience</h2>
          </div>
        </FadeIn>
        <div className="timeline-line pl-14 flex flex-col gap-10">
          {EXPERIENCE.map((e,i)=>(
            <FadeIn key={i} delay={i*150}>
              <div style={{position:"relative"}}>
                {/* Dot */}
                <div style={{position:"absolute",left:-34,top:16,width:16,height:16,
                  borderRadius:"50%",background:"#00d4ff",
                  boxShadow:"0 0 12px rgba(0,212,255,0.6)",border:"3px solid #0a0f1e"}}/>
                <div className="glass p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 style={{fontFamily:"Poppins",fontWeight:800,fontSize:18,color:"#f1f5f9"}}>
                        {e.role}
                      </h3>
                      <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,fontSize:14,marginTop:4}}>
                        {e.company}
                      </p>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <span style={{background:"rgba(0,212,255,0.1)",border:"1px solid rgba(0,212,255,0.3)",
                        color:"#00d4ff",borderRadius:20,padding:"4px 14px",fontSize:12,
                        fontFamily:"Poppins",fontWeight:600,display:"block",marginBottom:4}}>
                        {e.period}
                      </span>
                      <span style={{color:"#64748b",fontSize:12,fontFamily:"Inter"}}>{e.location}</span>
                    </div>
                  </div>
                  <ul style={{paddingLeft:20}}>
                    {e.points.map((pt,j)=>(
                      <li key={j} style={{color:"#94a3b8",fontSize:14,fontFamily:"Inter",
                        lineHeight:1.8,marginBottom:6}}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p style={{color:"#475569",fontSize:12,fontFamily:"Inter",marginTop:12}}>
                    📜 Certificate: {e.cert}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────
function Contact(){
  const [form,setForm]=useState({name:"",email:"",message:""});
  const handleSubmit=(e)=>{
    e.preventDefault();
    window.location.href=`mailto:mihirgiri2@gmail.com?subject=Message from ${form.name}&body=${form.message}`;
  };
  return (
    <section id="contact" className="relative py-24 px-6" style={{zIndex:1}}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p style={{color:"#00d4ff",fontFamily:"Poppins",fontWeight:600,letterSpacing:4,
              textTransform:"uppercase",fontSize:13,marginBottom:12}}>Let's Talk</p>
            <h2 className="section-title">Contact Me</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <FadeIn delay={100}>
            <div className="flex flex-col gap-5">
              <p style={{color:"#94a3b8",fontFamily:"Inter",lineHeight:1.9,fontSize:15}}>
                I'm actively looking for internship and full-time opportunities. Feel free to reach out!
              </p>
              {[
                {icon:"✉️",label:"Email",val:"mihirgiri2@gmail.com",href:"mailto:mihirgiri2@gmail.com"},
                {icon:"📞",label:"Phone",val:"+91 6203570295",href:"tel:+916203570295"},
                {icon:"💼",label:"LinkedIn",val:"linkedin.com/in/mihir-giri",href:"https://linkedin.com/in/mihir-giri"},
                {icon:"🐙",label:"GitHub",val:"github.com/MihirGiri",href:"https://github.com/MihirGiri"},
                {icon:"📱",label:"WhatsApp",val:"Chat on WhatsApp",href:"https://wa.me/qr/T4VPZHXA6WUSF1"},
                {icon:"📸",label:"Instagram",val:"@mihir_giri__",href:"https://www.instagram.com/mihir_giri__?igsh=MTB0dnY0aDV5MTR2ZQ=="},
              ].map((c,i)=>(
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="glass p-4 flex gap-4 items-center"
                  style={{textDecoration:"none",transition:"all 0.3s",display:"flex"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#00d4ff"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,212,255,0.15)"}>
                  <span style={{fontSize:22,minWidth:32}}>{c.icon}</span>
                  <div>
                    <p style={{fontFamily:"Poppins",fontWeight:600,fontSize:13,color:"#64748b"}}>{c.label}</p>
                    <p style={{fontFamily:"Inter",color:"#00d4ff",fontSize:14}}>{c.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
          {/* Form */}
          <FadeIn delay={200}>
            <form onSubmit={handleSubmit} className="glass p-8 flex flex-col gap-5">
              {["name","email","message"].map((f)=>(
                <div key={f}>
                  <label style={{fontFamily:"Poppins",fontWeight:600,fontSize:13,
                    color:"#00d4ff",display:"block",marginBottom:8,textTransform:"capitalize"}}>
                    {f}
                  </label>
                  {f==="message" ? (
                    <textarea rows={5} value={form[f]}
                      onChange={e=>setForm({...form,[f]:e.target.value})}
                      placeholder={`Your ${f}...`} required
                      style={{width:"100%",background:"rgba(255,255,255,0.04)",
                        border:"1px solid rgba(0,212,255,0.2)",borderRadius:12,
                        padding:"12px 16px",color:"#f1f5f9",fontFamily:"Inter",
                        fontSize:14,resize:"vertical",outline:"none"}}/>
                  ) : (
                    <input type={f==="email"?"email":"text"} value={form[f]}
                      onChange={e=>setForm({...form,[f]:e.target.value})}
                      placeholder={f==="name"?"Your name":"your@email.com"} required
                      style={{width:"100%",background:"rgba(255,255,255,0.04)",
                        border:"1px solid rgba(0,212,255,0.2)",borderRadius:12,
                        padding:"12px 16px",color:"#f1f5f9",fontFamily:"Inter",
                        fontSize:14,outline:"none"}}/>
                  )}
                </div>
              ))}
              <button type="submit" className="btn-primary" style={{width:"100%",marginTop:4}}>
                Send Message 🚀
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer(){
  return (
    <footer style={{zIndex:1,position:"relative",borderTop:"1px solid rgba(0,212,255,0.1)",
      padding:"32px 24px",textAlign:"center"}}>
      <div className="flex justify-center gap-6 mb-4">
        {[
          {icon:"🐙",href:"https://github.com/MihirGiri"},
          {icon:"💼",href:"https://linkedin.com/in/mihir-giri"},
          {icon:"📱",href:"https://wa.me/qr/T4VPZHXA6WUSF1"},
          {icon:"📸",href:"https://www.instagram.com/mihir_giri__?igsh=MTB0dnY0aDV5MTR2ZQ=="},
          {icon:"✉️",href:"mailto:mihirgiri2@gmail.com"},
        ].map((s,i)=>(
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{fontSize:22,transition:"transform 0.2s"}}
            onMouseEnter={e=>e.target.style.transform="scale(1.3)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}>
            {s.icon}
          </a>
        ))}
      </div>
      <p style={{fontFamily:"Poppins",color:"#475569",fontSize:13}}>
        Made with ❤️ & React by <span style={{color:"#00d4ff",fontWeight:600}}>Mihir Giri</span>
      </p>
      <p style={{fontFamily:"Inter",color:"#334155",fontSize:12,marginTop:6}}>
        © 2026 Mihir Giri. All rights reserved.
      </p>
    </footer>
  );
}

// ─── LOADER ──────────────────────────────────────────────────────────
function Loader(){
  return (
    <motion.div initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}
      style={{position:"fixed",inset:0,background:"#0a0f1e",zIndex:9999,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20}}>
      <motion.div animate={{rotate:360}} transition={{repeat:Infinity,duration:1,ease:"linear"}}
        style={{width:50,height:50,border:"3px solid rgba(0,212,255,0.2)",
          borderTop:"3px solid #00d4ff",borderRadius:"50%"}}/>
      <p style={{fontFamily:"Poppins",color:"#00d4ff",fontWeight:600,letterSpacing:4,
        textTransform:"uppercase",fontSize:13}}>Loading...</p>
    </motion.div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────
export default function App(){
  const [loading,setLoading]=useState(true);
  useEffect(()=>{const t=setTimeout(()=>setLoading(false),1500);return ()=>clearTimeout(t);},[]);
  return (
    <>
      <AnimatePresence>{loading&&<Loader/>}</AnimatePresence>
      {!loading&&(
        <>
          <Stars/>
          <Navbar/>
          <main>
            <Hero/>
            <About/>
            <Skills/>
            <Projects/>
            <Experience/>
            <Contact/>
          </main>
          <Footer/>
        </>
      )}
    </>
  );
}
