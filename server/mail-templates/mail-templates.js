function generateTemplate(mail) {
 return {
    resetPassword: 
    `<table cellpadding='0' cellspacing='0'>
        <tr>
            <td>
                <h1 align="right">איפוס סיסמה</h1>
                <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת לאפס את הסיסמה</h2>
            </td>
        </tr>
        <tr ><td><p>http://localhost:3000/private-area/reset-password/${mail.userId}/${mail.token}</p></td></tr>
        <tr ><td align="right"><p>לשאלות נוספות ניתן לפנות לכתובת המייל</p></td></tr>
        <tr ><td align="right">anu.arch.rl@gmail.com</td></tr>
    </table>`,
  authenticateUser: 
    `<table cellpadding='0' cellspacing='0'>
        <tr>
            <td>
                <h1 align="right">אימות זהות</h1>
                <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת להשלים את תהליך הרישום ולהתחבר לאתר</h2>
            </td>
        </tr>
        <tr ><td><p>http://localhost:3000/private-area/sign-up/${mail.token}</p></td></tr>
        <tr ><td align="right"><p>לשאלות נוספות ניתן לפנות לכתובת המייל</p></td></tr>
        <tr ><td align="right">anu.arch.rl@gmail.com</td></tr>
    </table>`,
    contactUs: 
    `<table cellpadding='0' cellspacing='0'>
    <tr>
        <td>
            <h1 align="right">שולח המייל: ${mail.firstName} ${mail.lastName}</h1>
        </td>
    </tr>
    <tr ><td><p>${mail.message}</p></td></tr>
    <tr ><td align="right"><p>כתובת מייל השולח: ${mail.email}</p></td></tr>
    <tr ><td align="right"><p>טלפון השולח: ${mail.phone}</p></td></tr>
</table>`,
}
}
exports.generateTemplate = generateTemplate