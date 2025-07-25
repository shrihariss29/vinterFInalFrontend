import React, { Children } from 'react'

import {motion} from "framer-motion"


const animations={
    initial:{opacity:0,x:100},
    animate:{opacity:1,x:0},
    exit:{opacity:0,x:-100}

}

function AnimatedPage({children}) {


  return (
    <motion.div 
    variants={animations}
     initial="initial" 
     animate="animate" 
     exit="exit"
     transition={{delay:0.2}}
     >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
