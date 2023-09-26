const puppeteer = require('puppeteer');

const FILE_PATH = 'file3.txt';
const TURNITIN_EMAIL = 'adeelgeneral@gmail.com';
const TURNITIN_PASSWORD = 'zfmmM4FnDx.SWc.';

async function automateTurnitin() {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to true for production
  const page = await browser.newPage();

  try {
    // Navigate to Turnitin and perform login
    await page.goto('https://www.turnitin.com/login_page.asp');
    await page.type('input[name="email"]', TURNITIN_EMAIL);
    await page.type('input[name="user_password"]', TURNITIN_PASSWORD);
    //await page.click('button[type="submit"]');

    await page.click('.submit');
    // // Wait for the login to complete (you might need to add proper selectors and waiting)
    //await page.waitForSelector('https://www.turnitin.com/s_home.asp');

   
     await page.goto('https://www.turnitin.com/t_class_home.asp?&svr=6&lang=en_us&aid=108664&cid=39325484');
    await page.waitForTimeout(3000); // 5 minutes
     
 
    await page.goto(' https://www.turnitin.com/t_inbox.asp?&svr=6&lang=en_us&aid=136487980');
    

    await page.waitForTimeout(3000); // 5 minutes


    


  let paperId=submissionID

  console.log("Finding Functions")
 



  // console.log("paperId",paperId)
  // const row = await page.evaluate((paperId) => {
  //   const rows = document.querySelectorAll('.inbox_table tr.student--1');
  //   for (const row of rows) {
  //     const rowPaperId = row.querySelector('.pid').textContent.trim();
  //     console.log("rowPaperId",rowPaperId)
  //     console.log("paperId",paperId)
  //     if (rowPaperId === paperId) {
  //       return row;
  //     }
  //   }
  //   return null;
  // }, paperId);


  // if (row) {
  //   // Click the "Similarity" field in the row
  //   console.log("Yes Found",row)
  //   console.log("Doing CLikc")
  //   const similarityField = await row.$('td.or_report_cell a.or-link');
  //   if (similarityField) {
  //     await similarityField.click();
  //     console.log('Clicked on Similarity for Paper ID:', paperId);
  //   } else {
  //     console.log('Similarity field not found for Paper ID:', paperId);
  //   }
  // } else {
  //   console.log('Paper ID not found:', paperId);
  // }

  // if(row)
  // {
  //   console.log("Yes Found",paperId)
  // }
  // else
  // {
  //   console.log("Not Found  Found",paperId)
  // }
    // // Wait for the report to be generated (this timing may vary based on Turnitin's behavior)
    // await page.waitForTimeout(300000); // 5 minutes

    // // Example: Download the report
    // // Implement downloading the report

      // Extract information for the specified paper ID
  const paperInformation = await extractPaperInformation(page, paperId);

  if (paperInformation) {
    console.log('Paper Information for Paper ID:', paperId);
    console.log('---------------------------------');
    console.log('AUTHOR:', paperInformation.author);
    console.log('TITLE:', paperInformation.title);
    console.log('SIMILARITY:', paperInformation.similarity);
    console.log('GRADE:', paperInformation.grade);
    console.log('RESPONSE:', paperInformation.response);
    console.log('FILE:', paperInformation.file);
    console.log('PAPER ID:', paperInformation.paperId);
    console.log('DATE:', paperInformation.date);
  } else {
    console.log(`Paper with ID ${paperId} not found.`);
  }

    console.log('Plagiarism report downloaded successfully.');
  } catch (error) {
    console.error('Error automating Turnitin:', error);
  } finally {
    //await browser.close(); 
  }
}

// Run the automation
automateTurnitin();
async function extractPaperInformation(page, paperId) {
  await page.reload();
  const rowSelector = `tr[class*="student--"][id*="${paperId}"]`;
  await page.waitForSelector(rowSelector);

  const paperInformation = await page.evaluate((selector) => {
    const row = document.querySelector(selector);
    if (!row) return null;

    const author = row.querySelector('.ibox_author').innerText;
    const title = row.querySelector('.ibox_title a').innerText;
    const similarity = row.querySelector('.or_report_cell span.or-percentage').innerText;
    const grade = row.querySelector('.ibox_grademark').innerText.trim();
    const response = row.querySelector('.clickable.gmr span').innerText.trim();
    const file = row.querySelector('.dl_file').getAttribute('title');
    const date = row.querySelector('.class_status').innerText;
    const paperId = row.querySelector('.pid').innerText;
 
    return {
      author,
      title,
      similarity,
      grade,
      response,
      file,
      paperId,
      date,
    };
  }, rowSelector);

  return paperInformation;
}