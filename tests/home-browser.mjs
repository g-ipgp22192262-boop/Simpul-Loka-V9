const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox']});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173');await page.locator('#nickname').waitFor();
assert.equal(await page.locator('.park-background').evaluate(i=>i.complete&&i.naturalWidth===1672),true);
assert.equal(await page.locator('.guide-characters').evaluate(i=>i.complete&&i.naturalWidth>0),true);
assert.equal(await page.locator('.park-home .wheel,.park-home .ride-art,.park-home .emoji').count(),0);
await page.getByRole('button',{name:'Teroka taman'}).click();assert.equal(await page.locator('#nav').isVisible(),true);await page.getByRole('button',{name:'Teroka taman'}).click();
for (const width of [1440,1024,768,390,320]) {
 await page.setViewportSize({width,height:900});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+width);
 const ratio=await page.locator('.park-background').evaluate(i=>i.clientWidth/i.clientHeight);assert(Math.abs(ratio-1672/941)<.01);
}
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Mod Inklusif'}).click();
await page.locator('#focus').check();await page.locator('#fontSize').selectOption('extrabig');await page.locator('#wide').check();
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
assert.equal(await page.locator('.adventure-ticket').evaluate(e=>getComputedStyle(e).transform),'none');
await page.locator('#focus').uncheck();await page.locator('#fontSize').selectOption('normal');await page.locator('#wide').uncheck();await page.getByRole('button',{name:'Mod Inklusif'}).click();
await page.locator('#nickname').fill('Aina');await page.locator('#kelas').fill('3 Bestari');await page.locator('#kelas').press('Enter');
await page.getByRole('heading',{name:'Perpustakaan Ajaib'}).waitFor();assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('home-page')),false);
await page.evaluate(()=>navTo('home'));await page.getByRole('button',{name:'Teruskan Pengembaraan'}).waitFor();
await page.reload();await page.getByRole('heading',{name:'Aina',exact:true}).waitFor();
assert.deepEqual(errors,[]);console.log('PASS home: image load/aspect ratio; real menu, keyboard registration, returning ticket, 1440/1024/768/390/320px, focus/very large text/wide spacing, no overflow or page errors.');await browser.close();
