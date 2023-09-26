const puppeteer = require('puppeteer');

const FILE_PATH = './files/file3.txt';
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


    await page.goto('https://www.turnitin.com/t_submit.asp?&svr=6&lang=en_us&aid=136487980');
    
 // Fill out the first name
      await page.type('#author_first', 'John');

      // Fill out the last name
      await page.type('#author_last', 'Doe');

      // Fill out the submission title
      await page.type('#title', 'My Submission Title');

      console.log('Filled out the form.');
    
        // Wait for the element to be present
      //console.log("data", page.waitForSelector('a[title="Class (No Repository)"]'))

        // Click the "Class (No Repository)" link
        //await page.click('a[title="Class (No Repository)"]');
    
    // const fileInput = await page.$('input[type="file"]');
    // await fileInput.uploadFile(FILE_PATH);
     // Attach the file to the file input

     console.log("file path",FILE_PATH)
     const fileInput = await page.$('#selected-file');
     await fileInput.uploadFile(FILE_PATH);  // Replace with the actual file path

     await page.click('#upload-btn');


     await page.waitForTimeout(10000);
    // Wait for the page to load and for the button to be visible
    //await page.waitForSelector('#confirm-btn');
     // Click the "Confirm" button
    // await page.click('#confirm-btn');
    // console.log('Clicked on "Confirm" button.');
 
    //  // Wait for the relevant elements to be present
    // await page.waitForSelector('#submission-metadata-pagecount');
    // await page.waitForSelector('#submission-metadata-wordcount');
    // await page.waitForSelector('#submission-metadata-oid');
    // await page.waitForSelector('#submission-metadata-date');

    // // Extract submission details
    // const pageCount = await page.evaluate(() => {
    //   return document.querySelector('#submission-metadata-pagecount').innerText;
    // });

    // const wordCount = await page.evaluate(() => {
    //   return document.querySelector('#submission-metadata-wordcount').innerText;
    // });

    // const submissionId = await page.evaluate(() => {
    //   return document.querySelector('#submission-metadata-oid').innerText;
    // });

    // const submissionDate = await page.evaluate(() => {
    //   return document.querySelector('#submission-metadata-date').innerText;
    // });

    // console.log('Page Count:', pageCount);
    // console.log('Word Count:', wordCount);
    // console.log('Submission ID:', submissionId);
    // console.log('Submission Date:', submissionDate);

    // Click the "Confirm" button
    await page.click('#confirm-btn');

    
    console.log('Clicked on "Confirm');

 
    
    console.log('Clicked on "Confirm');

    await page.waitForTimeout(10000);
 
      // Wait for the page to load and for the required elements to be visible
  await page.waitForSelector('#submission-metadata-wordcount');
  await page.waitForSelector('#submission-metadata-pagecount');
  await page.waitForSelector('#submission-metadata-date');
  await page.waitForSelector('#submission-metadata-oid');

  // Extract the content of the elements
  const wordCount = await page.evaluate(() => {
    const element = document.querySelector('#submission-metadata-wordcount');
    return element ? element.innerText : null;
  });

  const pageCount = await page.evaluate(() => {
    const element = document.querySelector('#submission-metadata-pagecount');
    return element ? element.innerText : null;
  });

  const submissionDate = await page.evaluate(() => {
    const element = document.querySelector('#submission-metadata-date');
    console.log("element",element)
    return element ? element.innerText : null;
  });

  const submissionID = await page.evaluate(() => {
    const element = document.querySelector('#submission-metadata-oid');
    console.log("element",element)
    return element ? element.innerText : null;
  });

      
     // Log the extracted data
  console.log('Word Count:', wordCount);
  console.log('Page Count:', pageCount);
  console.log('Submission Date:', submissionDate);
  console.log('Submission ID:', submissionID);


  await page.click('#close-btn');
  
  await page.waitForTimeout(10000);
  console.log("Refresh Page ")
  await page.reload();


  let paperId=submissionID

  console.log("Finding Functions")
  await page.waitForTimeout(10000);
  
  await page.goto('https://ev.turnitin.com/auth/ev/599f4ba538fb0c55a778646a0271493df84a11bb8df35b6093fdfd98c7d72803');
  await page.waitForTimeout(3000);
  const urlWithPaperId = `https://ev.turnitin.com/app/carta/en_us/?o=${paperId}&lang=en_us&u=1075295869&s=1`;
  await page.goto(urlWithPaperId);
  await page.waitForTimeout(10000);
  
  await page.goto('https://ev.turnitin.com/paper/${paperId}/queue_pdf/sas:0f71ce96-d944-4e47-9544-538bebad5b32?ready=1&lang=en_us');
  console.log("File Downloaded")
  // await page.reload();
  // await page.click('#sc4633');
  //console.log("Clicked on Setting icon")
  // await page.click('#sc5296');
  //console.log("Clicked on Download icon")
  // await page.click('#sc5845-0');
  //console.log("Clicked on Current View")
  // await page.click('.column.success .header');
  // console.log("Clicked on Similarity")






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