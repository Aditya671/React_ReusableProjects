import React, { Fragment, useContext } from 'react';
import {StoreThemeProvider} from './../../context/StoreThemeProvider';
import Styles from './ThemeButton.module.css'
import {MdWbSunny} from 'react-icons/md'
import {WiMoonAltNew} from 'react-icons/wi'

export const MyThemeSwitchBtn = () => {
   const themeRef = React.useRef()
   const {theme,toggleTheme} = useContext(StoreThemeProvider)

   function handleThemeToggle(){
      toggleTheme()
   }

   return (
      <Fragment>
         <div className={`${Styles.themebtnContainer}`}>
            <div className={`${Styles.switch} `}>
               <input type='checkbox' name='getTheme' 
                  className={`${Styles.themeInput}`} ref={themeRef} 
                  onChange={handleThemeToggle} />
                  <span className={`${Styles.slider} ${Styles.round}`}>
                  {theme === 'dayTheme' ? 
                     <MdWbSunny className={`${Styles.active} ${Styles.activeDay}`}/> : 
                     <WiMoonAltNew className={`${Styles.active} ${Styles.activeNight}`}/>}
                  </span>
            </div>
         </div>
      </Fragment>
   )

}