import React from 'react';

const StrenthMeter = () => {

    const calcPasswordStrenth = (password) => {
        const strengthMeter = document.getElementById('strength-meter')
        const reasons = document.getElementById('reasons')
        let strength = 100
        let weaknesses = []

        weaknesses.push(lengthWeakness(password))
        weaknesses.push(numbersWeakness(password))
        weaknesses.push(lowercaseWeakness(password))
        weaknesses.push(uppercaseWeakness(password))
        weaknesses.push(unauthorizedCharacters(password))
        weaknesses.push(repeatCharacters(password))
      
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

    const repeatCharacters = password => {
        const matches = password.match(/([a-zA-Z0-9])\1/g) || []
        if(matches.length !== 0){
            return {
            message: 'אסור להשתמש בתווים חוזרים',
            deduction: 10  
        }}
    }

    const lengthWeakness = password => {
        if(password.length < 8) return {
            message: 'הסיסמה חייבת להכיל לפחות שמונה תווים',
            deduction: 30
        }
    }
    
    const unauthorizedCharacters = password =>{
        const matches = password.match(/[^A-Za-z0-9]/g) || []
        if(matches.length !== 0){
            return {
            message: 'סימן לא מורשה! השתמש רק באותיות גדולות וקטנות באנגלית ובמספרים ',
            deduction: 100  
        }}
    }

    const lowercaseWeakness = password => {
        const matches = password.match(/[a-z]/g) || []
        if(matches.length < 3){
            return{
                message: 'הסיסמה חייבת להכיל לפחות שלושה אותיות קטנות באנגלית',
                deduction: 20   
            }}
    }

    const numbersWeakness = password => {
        const matches = password.match(/[0-9]/g) || []
        if(matches.length < 4){
            return{
                message: 'הסיסמה חייבת להכיל לפחות ארבעה מספרים',
                deduction: 20   
            }}
    }

    const uppercaseWeakness = password => {
        const matches = password.match(/[A-Z]/g) || []
        if(matches.length === 0){
            return{
                message: 'הסיסמה חייבת להכיל לפחות אות אחת גדולה באנגלית',
                deduction: 20   
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