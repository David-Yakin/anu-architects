import React from 'react';

const StrenthMeter = () => {
    const calcPasswordStrenth = password => {
        const strengthMeter = document.getElementById('strength-meter')
        const reasons = document.getElementById('reasons')
        let strength = 100
        let weaknesses = []

        weaknesses.push(lengthWeakness(password))
        weaknesses.push(checkRegex(password, /(!|@|#|\$|%|\^|&|\*|-)/g, 1, 10, 'הסיסמה חייבת להכיל לפחות אחד מהסימנים הבאים !@#$%^&*-'))
        weaknesses.push(checkRegex(password, /[0-9]/g, 4, 20, 'הסיסמה חייבת להכיל לפחות ארבעה מספרים'))
        weaknesses.push(checkRegex(password, /[a-z]/g, 3, 20, 'הסיסמה חייבת להכיל לפחות שלושה אותיות קטנות באנגלית'))
        weaknesses.push(checkRegex(password, /[A-Z]/g, 1, 20, 'הסיסמה חייבת להכיל לפחות אות אחת גדולה באנגלית'))
        weaknesses.push(checkIfNotZero(password, /([a-zA-Z0-9])\1/g,  20, 'אסור להשתמש בתווים חוזרים'))
        weaknesses.push(checkIfNotZero(password, /[^A-Za-z0-9!@#$%^&*-]/g,  100, 'סימן לא מורשה! השתמש רק באותיות גדולות וקטנות באנגלית במספרים ובסימנים !@#$%^&*-'))
      
        weaknesses.forEach( weakness => {   
            if (weakness !== undefined){
                strength = strength - weakness.deduction
                reasons.innerHTML = ''
                reasons.innerHTML = weakness.message
            }})

        strengthMeter.style.setProperty('--strength', strength)
        strengthMeter.style.setProperty('--bg', strengthMeterColor(strength))

        if(strength === 100) {
            reasons.innerHTML = ''
            weaknesses = []
        } 
    }
    
        const lengthWeakness = password => {
            if(password.length < 9) return {
                message: 'הסיסמה חייבת להכיל לפחות תשעה תווים',
                deduction: 20
            }
        }
    
    const checkRegex = (password, regex, length, deduction, message) => {
        const matches = password.match(regex) || []
        if(matches.length < length){
            return{
                message,
                deduction   
            }}
    }

    const checkIfNotZero = (password, regex, deduction, message) => {
        const matches = password.match(regex) || []
        if(matches.length !== 0){
            return{
                message,
                deduction   
            }}
    }

    const strengthMeterColor = strength => {
        if(strength === 100) return 'green'
        if(strength >= 80 && strength < 100) return 'orange'
        if(strength >= 60 && strength < 80) return 'darkgoldenrod'
        if(strength >= 40 && strength < 60) return 'red'
        if(strength >= 20 && strength < 40) return 'darkred'
        if(strength >= 0 && strength < 20) return 'black'
    }

    return ( 
        <div className="d-flex justify-content-center my-2">  
            <div className="col-12 p-0">
                <div className='strength-meter'
                     id='strength-meter'></div>
                     
                    <input type="password" 
                       aria-labelledby="password"
                       className="form-control m-0 password-input text-rtl"
                       id='password-input'
                       placeholder="סיסמה *"
                       onInput={e => calcPasswordStrenth(e.target.value)}/>

                    <span id="reasons" className="text-danger text-rtl"></span>
            </div> 
        </div>
     );
}
 
export default StrenthMeter;