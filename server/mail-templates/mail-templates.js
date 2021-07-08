function generateTemplate(mail) {
  return {
    resetPassword: `<table cellpadding='0' cellspacing='0'>
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
    authenticateUser: `<table cellpadding='0' cellspacing='0'>
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
    contactUs: `<table cellpadding='0' cellspacing='0'>
    <tr>
        <td>
            <h1 align="right">שולח המייל: ${mail.firstName} ${mail.lastName}</h1>
        </td>
    </tr>
    <tr ><td><p>${mail.message}</p></td></tr>
    <tr ><td align="right"><p>כתובת מייל השולח: ${mail.email}</p></td></tr>
    <tr ><td align="right"><p>טלפון השולח: ${mail.phone}</p></td></tr>
</table>`,
    sendImage: `<table cellpadding='0' cellspacing='0'>
    <tr>
        <td>
        <h1 align="right">הועלתה תמונה או קובץ PDF לפרויקט שלך</h1>
        <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת לראות את התמונה</h2>
        </td>
    </tr>
    <tr ><td><p>http://localhost:3000/private-area/project/${mail.route}/${mail.projectId}</p></td></tr>
    <tr><td>${mail.description}</td></tr>
</table>`,
    receiveComments: `<table cellpadding='0' cellspacing='0'>
    <tr>
        <td>
        <h1 align="right">שולח המייל: ${mail.firstName} ${mail.lastName}</h1>
        <h2 align="right" cellpadding='0'>לחץ על הקישור כדי לראות את התמונה ואת הערות הלקוח עליה</h2>
        </td>
    </tr>
    <tr ><td><p>http://localhost:3000/private-area/project/${mail.fild}/${mail.projectId}</p></td></tr>
    <tr><td>תגובת הלקוח לתמונה: ${mail.remarks}</td></tr>
    <tr><td>המייל של הלקוח: ${mail.email}</td></tr>
    <tr><td>הטלפון של הלקוח: ${mail.phone}</td></tr>
</table>`,
    projectCreated: `<table cellpadding='0' cellspacing='0'>
<tr>
    <td>
    <h1 align="right">נוצר פרויקט חדש עבורך</h1>
    <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת לראות את הפרויקט</h2>
    </td>
</tr>
<tr ><td><p>http://localhost:3000/private-area/user/${mail.userId}</p></td></tr>
<tr><td>${mail.description}</td></tr>
</table>`,
    blogCreated: `<table cellpadding='0' cellspacing='0'>
<tr>
    <td>
    <h1 align="right">נוצר מאמר חדש</h1>
    <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת לראות את המאמר</h2>
    </td>
</tr>
<tr ><td><p>http://localhost:3000/blog-page/${mail.blogId}</p></td></tr>
<tr><td>${mail.description}</td></tr>
</table>`,
    newUser: `<table cellpadding='0' cellspacing='0'>
<tr>
    <td>
    <h1 align="right">משתמש חדש נרשם לאתר</h1>
    <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת לראות את המשתמש</h2>
    </td>
</tr>
<tr ><td><p>http://localhost:3000/private-area/user/${mail.userId}</p></td></tr>
<tr><td>${mail.description}</td></tr>
</table>`,
  };
}
exports.generateTemplate = generateTemplate;
