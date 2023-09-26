const puppeteer = require('puppeteer');

const FILE_PATH = 'https://plag.seoandamztools.com/files/file2.txt';
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