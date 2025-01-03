"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  email: string;
};

const teams = {
  'Overall lead': [
    {
      name: 'Ashutosh Govind Singh',
      role: 'Mentor',
      photo: 'members/ashutosh.jpg',
      linkedin: 'https://www.linkedin.com/in/ashwhotosh/',
      email: 'cs22b1013@iiitr.ac.in',
    },
    {
      name: 'K V Jaya Harsha',
      role: 'Secretary 1',
      photo: 'members/harsha.png',
      linkedin: 'https://www.linkedin.com/in/kvjharsha/',
      email: 'cs23b1034@iiitr.ac.in',
    },
    {
      name: 'G Jashwanth',
      role: 'Secretary 2',
      photo: 'members/jashwanth.png',
      linkedin: 'https://www.linkedin.com/in/jashwanth-guguloth-411017283/',
      email: 'ad23b1020@iiitr.ac.in',
    },
  ],
  
  'Shutter Squad': [
    {
      name: 'S Jaswanth',
      role: 'Shutter Squad Lead',
      photo: 'members/s-jaswanth.png',
      linkedin: 'https://www.linkedin.com/in/jaswanth-sunkara-21292a29a',
      email: 'cs23b1073@iiitr.ac.in',
    },
    {
      name: 'Santhosh',
      role: 'Core Team',
      photo: 'members/santhosh.png',
      linkedin: 'https://www.linkedin.com/in/santhosh-yanamadni-801b56299',
      email: 'ad23b1060@iiitr.ac.in',
    },
    {
      name: 'B Vasudevareddy',
      role: 'Core Team',
      photo: 'members/vasu.png',
      linkedin: 'https://www.linkedin.com/in/byreddy-vasudevareddy-5525942a7',
      email: 'ad23b1013@iiitr.ac.in', 
    }, 
    {
      name: 'V Sowmya',
      role: 'Core Team',
      photo: 'members/sowmya.png',
      linkedin: 'https://www.linkedin.com/in/sowmya-vadde-5b82052b6',
      email: 'cs23b1077@iiitr.ac.in', 
    },  
    {
      name: 'Harsh Kholwar',
      role: 'Core Team',
      photo: 'members/harshk.png',
      linkedin: 'https://www.linkedin.com/in/harsh-kholwar-b369b2332/',
      email: 'mc24b1012@iiitr.ac.in', 
    },  
    {
      name: 'Sravanthi',
      role: 'Core Team',
      photo: 'members/sravanthi.png',
      linkedin: 'https://www.linkedin.com/in/sravanthi-bevara-351996327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'cs24b1010@iiitr.ac.in', 
    },  
    {
      name: 'Tanmay Mallik',
      role: 'Core Team',
      photo: 'members/tanmay.png',
      linkedin: 'https://www.linkedin.com/in/tanmay-mallik-174a202a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'cs24b1058@iiitr.ac.in', 
    },    
  ],
  'Content and Creatives': [
    {
      name: 'Abhishek Buddiga',
      role: 'Ideation Team Lead',
      photo: 'members/abhishek.png',
      linkedin: 'https://www.linkedin.com/in/abhishek-buddiga-bb5a0b2b8/',
      email: 'ad23b1012@iiitr.ac.in',
    },
    {
      name: 'P Charukesh',
      role: 'Graphic Team Lead',
      photo: 'members/charukesh.png',
      linkedin: 'https://www.linkedin.com/in/pyla-charukesh-937aa02b7/',
      email: 'ad23b1043@iiitr.ac.in', 
    },
    {
      name: 'O Vinay Reddy',
      role: 'Graphic Team',
      photo: 'members/vinay.jpg',
      linkedin: 'https://www.linkedin.com/in/vinay-reddy-9aa439295/',
      email: 'ad23b1039@iiitr.ac.in', 
    },  
    {
      name: 'K Deepthika',
      role: 'Ideation Team',
      photo: 'members/deepthika.png',
      linkedin: 'https://www.linkedin.com/in/kakarla-deepthika-2b134b2ba',
      email: 'cs23b1030@iiitr.ac.in', 
    },  
    {
      name: 'k Lakshmi Sravika',
      role: 'Graphic Team',
      photo: 'members/sravika.png',
      linkedin: 'https://linkedin.com/in/lakshmi-sravika-k-ab19772a7',
      email: 'ad23b1024@iiitr.ac.in', 
    },  
    {
      name: 'Balisetty Tony Madhuri',
      role: 'Graphic Team',
      photo: 'members/tony.png',
      linkedin: 'https://www.linkedin.com/in/sita-rama-4b9203331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'ad24b1012@iiitr.ac.in', 
    },  
    {
      name: 'Naveen Mittal',
      role: 'Ideation Team',
      photo: 'members/naveen.png',
      linkedin: 'https://www.linkedin.com/in/naveen-mittal-267a291ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'ad24b1044@iiitr.ac.in', 
    },  
    {
      name: 'Saransh Sharma',
      role: 'Graphic Team',
      photo: 'members/saransh.png',
      linkedin: 'https://www.linkedin.com/in/saransh-sharma-3a3a3a2b5/',
      email: 'cs24b1052@iiitr.ac.in', 
    },  
  ],
  'Video Team': [
    {
      name: 'Vijay N Gowd',
      role: 'Team Lead',
      photo: 'members/vijay.jpg',
      linkedin: 'https://www.linkedin.com/in/kota-vijay-narasimha-gowd-a91a162a5/',
      email: 'cs23b1035@iiitr.ac.in',
    },
    {
      name: 'Sarthak Jain',
      role: 'Core Team',
      photo: 'members/sarthak.jpg',
      linkedin: 'https://www.linkedin.com/in/sarthak-jain-191797254/',
      email: 'cs23b1062@iiitr.ac.in', 
    },  
    {
      name: 'Smaran Reddy',
      role: 'Core Team',
      photo: 'members/smaran.png',
      linkedin: 'https://www.linkedin.com/in/smaran-reddy-57a5b62a0/',
      email: 'cs23b1011@iiitr.ac.in', 
    },  
    {
      name: 'Mayank Soni',
      role: 'Core Team',
      photo: 'members/mayank.png',
      linkedin: 'https://www.linkedin.com/in/mayank-soni-2580a9337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'cs24b1031@iiitr.ac.in', 
    },
  ],
};

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, photo, linkedin, email }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl p-6 flex flex-col items-center text-center min-h-[300px] min-w-[250px] transition-transform duration-300 hover:scale-[1.07] hover:shadow-[0_0_30px_6px_rgba(101,255,101,0.7)]"
  >
    <img
      src={photo || "https://via.placeholder.com/150"}
      alt={name}
      className="w-32 h-32 rounded-full border-4 border-lime-400 mb-4"
    />
    <h2 className="text-xl font-bold text-white">{name}</h2>
    <p className="text-lime-400 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
      {role}
    </p>
    <div className="flex space-x-4 mt-4">
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lime-400 hover:text-lime-500 transition-transform transform hover:scale-110 text-2xl"
        aria-label={`LinkedIn profile of ${name}`}
      >
        <FaLinkedin />
      </a>
      <a
        href={`mailto:${email}`}
        className="text-lime-400 hover:text-lime-500 transition-transform transform hover:scale-110 text-2xl"
        aria-label={`Email ${name}`}
      >
        <FaEnvelope />
      </a>
    </div>
  </motion.div>
);


const TeamSection: React.FC<{ title: string; team: TeamMember[] }> = ({ title, team }) => (
  <>
    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-4xl font-extrabold text-lime-400 mt-16 mb-12"
    >
      {title}
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member, index) => (
        <TeamMemberCard key={index} {...member} />
      ))}
    </div>
  </>
);

const Page: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-lime-400 mb-12"
      >
        Meet Our Team
      </motion.h1>
      {Object.entries(teams).map(([key, members]) => (
        <TeamSection key={key} title={key.replace(/([a-z])([A-Z])/g, "$1 $2")} team={members} />
      ))}
    </motion.div>
  );
};

export default Page;
