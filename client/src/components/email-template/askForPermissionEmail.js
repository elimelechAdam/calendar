// const title = "בקשת הרשאה ליומנך";
// const body =
//   "נשלחה בקשת הרשאה ליומנך ,בשביל לאשר/לדחות יש להיכנס למערכת הניהול שלך";
// const footer = "לתמיכה נוספת ניתן לפנות למנהל המערכת";
// const emailContent = `
// <html lang="he">
//   <head>
//     <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
//     <title>${title}</title>
//     <meta name="description" content="בקשת הרשאות" />
//     <style type="text/css">
//       a:hover {
//         text-decoration: underline !important;
//       }
//     </style>
//   </head>

//   <body
//     marginheight="0"
//     topmargin="0"
//     marginwidth="0"
//     style="margin: 0px; background-color: #f2f3f8"
//     leftmargin="0"
//   >
//     <!--100% body table-->
//     <table
//       cellspacing="0"
//       border="0"
//       cellpadding="0"
//       width="100%"
//       bgcolor="#f2f3f8"
//       style="
//         @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
//         font-family: &quot;Open Sans&quot;, sans-serif;
//       "
//     >
//       <tr>
//         <td>
//           <table
//             style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
//             width="100%"
//             border="0"
//             align="center"
//             cellpadding="0"
//             cellspacing="0"
//           >
//             <tr>
//               <td style="height: 80px">&nbsp;</td>
//             </tr>
//             <tr>
//               <td style="text-align: center">
//                 <a href="https://wxg.co.il" title="logo" target="_blank">
//                   <img
//                     width="150"
//                     src="https://careers.wxg.co.il/www.wxg.co.il/app/themes/wxg/resources/assets/images/WXG-Logo.png"
//                     title="logo"
//                     alt="logo"
//                   />
//                 </a>
//               </td>
//             </tr>
//             <tr>
//               <td style="height: 20px">&nbsp;</td>
//             </tr>
//             <tr>
//               <td>
//                 <table
//                   width="95%"
//                   border="0"
//                   align="center"
//                   cellpadding="0"
//                   cellspacing="0"
//                   style="
//                     max-width: 670px;
//                     background: #fff;
//                     border-radius: 3px;
//                     text-align: center;
//                     -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
//                     -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
//                     box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
//                   "
//                 >
//                   <tr>
//                     <td style="height: 40px">&nbsp;</td>
//                   </tr>
//                   <tr>
//                     <td style="padding: 0 35px">
//                       <h1
//                         style="
//                           color: #1e1e2d;
//                           font-weight: 500;
//                           margin: 0;
//                           font-size: 32px;
//                           font-family: &quot;Rubik&quot;, sans-serif;
//                         "
//                       >
//                         ${title}
//                       </h1>
//                       <span
//                         style="
//                           display: inline-block;
//                           vertical-align: middle;
//                           margin: 29px 0 26px;
//                           border-bottom: 1px solid #cecece;
//                           width: 100px;
//                         "
//                       ></span>
//                       <p
//                         style="
//                           color: #455056;
//                           font-size: 15px;
//                           line-height: 24px;
//                           margin: 0;
//                         "
//                       >
//                         ${body}
//                       </p>
//                       <a
//                         href="https://calendaralp.vercel.app/"
//                         style="
//                           background-color: #212121;
//                           text-decoration: none !important;
//                           font-weight: 500;
//                           margin-top: 35px;
//                           color: #fff;
//                           text-transform: uppercase;
//                           font-size: 14px;
//                           padding: 10px 24px;
//                           display: inline-block;
//                           border-radius: 50px;
//                         "
//                         >כניסה למערכת</a
//                       >
//                     </td>
//                   </tr>
//                   <td>
//                   <p style="color: #455056;font-size: 15px;line-height: 12px;padding:10px">${footer}</p>
//                   </td>
//                   <tr>
//                     <td style="height: 40px">&nbsp;</td>
//                   </tr>
//                 </table>
//               </td>
//             </tr>

//             <tr>
//               <td style="height: 20px">&nbsp;</td>
//             </tr>
//             <tr>
//               <td style="text-align: center">
//                 <p
//                   style="
//                     font-size: 14px;
//                     color: rgba(69, 80, 86, 0.7411764705882353);
//                     line-height: 18px;
//                     margin: 0 0 0;
//                   "
//                 >
//                   &copy; <strong>www.wxg.co.il</strong>
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <td style="height: 80px">&nbsp;</td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//     <!--/100% body table-->
//   </body>
// </html>

// `;
const getEmailContent = (emailAddress, userName, permissionType) => {
  const title = "בקשת הרשאה ליומנך";
  const body = `
                  המשתמש ${userName} - ${emailAddress} <br>
                  שלח לך בקשה ל${permissionType} האם אתה מאשר?`;
  const footer = "לתמיכה נוספת ניתן לפנות למנהל המערכת";

  return `
  <html lang="he">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>${title}</title>
      <meta name="description" content="בקשת הרשאות" />
      <style type="text/css">
        a:hover {
          text-decoration: underline !important;
        }
      </style>
    </head>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="margin: 0px; background-color: #f2f3f8"
      leftmargin="0"
      dir="rtl"
    >
      <!--100% body table-->
      <table
        cellspacing="0"
        border="0"
        cellpadding="0"
        width="100%"
        bgcolor="#f2f3f8"
        style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: &quot;Open Sans&quot;, sans-serif;
        "
      >
        <tr>
          <td>
            <table
              style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <a href="https://wxg.co.il" title="logo" target="_blank">
                    <img
                      width="150"
                      src="https://careers.wxg.co.il/www.wxg.co.il/app/themes/wxg/resources/assets/images/WXG-Logo.png"
                      title="logo"
                      alt="logo"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 670px;
                      background: #fff;
                      border-radius: 3px;
                      text-align: center;
                      -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    "
                  >
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 35px">
                        <h1
                          style="
                            color: #1e1e2d;
                            font-weight: 500;
                            margin: 0;
                            font-size: 32px;
                            font-family: &quot;Rubik&quot;, sans-serif;
                          "
                        >
                          ${title}
                        </h1>
                        <span
                          style="
                            display: inline-block;
                            vertical-align: middle;
                            margin: 29px 0 26px;
                            border-bottom: 1px solid #cecece;
                            width: 100px;
                          "
                        ></span>
                        <p
                          style="
                            color: #455056;
                            font-size: 15px;
                            line-height: 24px;
                            margin: 0;
                          "
                        >
                          ${body}
                        </p>
                        <a
                          href="https://calendaralp.vercel.app/"
                          style="
                            background-color: #212121;
                            text-decoration: none !important;
                            font-weight: 500;
                            margin-top: 35px;
                            color: #fff;
                            text-transform: uppercase;
                            font-size: 14px;
                            padding: 10px 24px;
                            display: inline-block;
                            border-radius: 50px;
                          "
                          >כניסה למערכת</a
                        >
                      </td>
                    </tr>
                    <td>
                    <p style="color: #455056;font-size: 15px;line-height: 12px;padding:10px">${footer}</p>
                    </td>
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
      
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--/100% body table-->
    </body>
  </html>
  `;
};

export default getEmailContent;
