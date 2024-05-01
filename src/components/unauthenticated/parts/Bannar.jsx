import React from 'react'
import {motion} from 'framer-motion'
import { message } from '../../../common/links';
import { useDetails } from '../../../utils/Context/MetaDetails';

function Notificationbanner() {
	const {close,setClose} = useDetails();
	
	const show = {
		opacity: 1,
		display: "block"
	  };
	  
	  const hide = {
		opacity: 0,
		transitionEnd: {
		  display: "none"
		}
	  };
  return (
	<motion.div  onClick={()=>{setClose(!close)}} animate={close ? hide : show} className={`text-center ${close ? 'hidden':'block'} break-words cursor-pointer px-5 py-2 bg-gradient-to-r from-blue-400 text-white to-blue-500 `}>
	  <h1 className="lg:text-base text-xs font-sans font-medium">{message}</h1>
	</motion.div>
  )
}

export default Notificationbanner
