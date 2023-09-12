import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import { MemberListPage } from "../../page-objects/memberListPage";

describe('member list page row', function () {
  // const memberListPage: MemberListPage = browser.page.memberListPage();

  it.skip('displays a full name value in the Name column', async function (browser: NightwatchBrowser) {
    const row0NameEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--name"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowName;
    if (memberRows.length > 0) {
      firstRowName = browser.element(row0NameEl).getText();
    }
    expect(firstRowName).to.be.contain("Putnam");
  });

  it.skip('displays an identifing address value in the Address column', async function (browser: NightwatchBrowser) {
    const row0AddressEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--address"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowAddress;
    if (memberRows.length > 0) {
      firstRowAddress = browser.element(row0AddressEl).getText();
    }
    expect(firstRowAddress).to.be.contain("Albert");

  });

  it.skip('displays a formatted phone value in the Phone column', async function (browser: NightwatchBrowser) {
    const row0PhoneEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--phone"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowPhone;
    if (memberRows.length > 0) {
      firstRowPhone = browser.element(row0PhoneEl).getText();
    }
    expect(firstRowPhone).to.be.contain("-0985");
  });

  it.skip('displays email value in the Email column', async function (browser: NightwatchBrowser) {
    const row0PhoneEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--phone"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowPhone;
    if (memberRows.length > 0) {
      firstRowPhone = browser.element(row0PhoneEl).getText();
    }
    expect(firstRowPhone).to.be.contain("-0985");
  });

  it.skip('displays MMB value in the MMB column', async function (browser: NightwatchBrowser) {
    const row0MmbEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--mmb"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowMmb;
    if (memberRows.length > 0) {
      firstRowMmb = browser.element(row0MmbEl).getText();
    }
    expect(firstRowMmb).to.be.contain("LM");
  });

  it('has a row context menu', async function (browser: NightwatchBrowser) {
    const row0ToolsEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--tools"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowTools;
    // let frt;
    if (memberRows.length > 0) {
      firstRowTools = await browser.element(row0ToolsEl).getText();
      // frt = await browser.element(row0ToolsEl).getAttribute("innerHTML");
      // console.log(`first row tools ${JSON.stringify(frt)}`)
    }
    expect(firstRowTools).to.be.contain("⋮");
  });
  /*
  first row tools 
  "<div class=\"member-row--menu\" data-testid=\"member-row--menu\">
    <button class=\"dropbtn\" data-testid=\"dropbtn\">⋮</button>
    <div class=\"dropdown-content\" data-testid=\"dropdown-content\">
      <div class=\"member-row--menu-edit\" data-testid=\"member-row--menu-edit\" member-id=\"TQ-9HNzNC\">Edit           member</div>
      <div class=\"member-row--menu-renewal\"                              ││   data-testid=\"member-row--menu-renewal\" member-id=\"TQ-9HNzNC\">Process         ││   donation</div><div class=\"member-row--menu-money\"                              ││   data-testid=\"member-row--menu-money\">View remittances</div><div                ││   class=\"member-row--menu-notes\" data-testid=\"member-row--menu-notes\">View     ││   notes</div><div class=\"member-row--menu-drop\"                                  ││   data-testid=\"member-row--menu-drop\">Drop member</div></div></div>"     
  */

  it.skip('the row context menu includes an Edit item', async function (browser: NightwatchBrowser) {
    const row0ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--menu-edit"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row0ToolsMenuEl);
      firstRowTools = await browser.element(row0ToolsMenuEl).getAttribute("innerHTML");
      console.log(`first row edit ${JSON.stringify(firstRowTools)}`)
    }
    expect(firstRowTools).to.be.contain("Edit");
  });

  it.skip('the row context menu includes an View remittances item', async function (browser: NightwatchBrowser) {
    const row0ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--menu-money"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row0ToolsMenuEl);
      firstRowTools = await browser.element(row0ToolsMenuEl).getAttribute("innerHTML");
      console.log(`first row edit ${JSON.stringify(firstRowTools)}`)
    }
    expect(firstRowTools).to.be.contain("View remittances");
  });

  it.skip('the row context menu includes an View notes item', async function (browser: NightwatchBrowser) {
    const row0ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--menu-notes"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row0ToolsMenuEl);
      firstRowTools = await browser.element(row0ToolsMenuEl).getAttribute("innerHTML");
      console.log(`first row edit ${JSON.stringify(firstRowTools)}`)
    }
    expect(firstRowTools).to.be.contain("View notes");
  });

  it.skip('the row context menu includes an Process donation item when row is for a Life member', async function (browser: NightwatchBrowser) {
    // TODO walk down to a certain LM
    const row0ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[1]//*[@data-testid="member-row--menu-renewal"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let firstRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row0ToolsMenuEl);
      firstRowTools = await browser.element(row0ToolsMenuEl).getAttribute("innerHTML");
      console.log(`first row edit ${JSON.stringify(firstRowTools)}`)
    }
    firstRowTools = firstRowTools ? firstRowTools : "";
    // TODO when we know we are on an LM change to equal test
    expect(["Process donation", "Renew member"].includes(firstRowTools)).to.be.true;
  });

  it.skip('the row context menu includes an Renew member item when row is for a paying member or volunteer', async function (browser: NightwatchBrowser) {
    // TODO walk down to a certain LM
    const row1ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[2]//*[@data-testid="member-row--menu-renewal"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let secondRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row1ToolsMenuEl);
      secondRowTools = await browser.element(row1ToolsMenuEl).getAttribute("innerHTML");
      console.log(`first row edit ${JSON.stringify(secondRowTools)}`)
    }
    secondRowTools = secondRowTools ? secondRowTools : "";
    // TODO when we know we are on an LM change to equal test
    expect(["Process donation", "Renew member"].includes(secondRowTools)).to.be.true;
  });

  it.skip('the row context menu includes an Drop member item ', async function (browser: NightwatchBrowser) {
    // TODO walk down to a certain LM
    const row1ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[2]//*[@data-testid="member-row--menu-drop"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let secondRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row1ToolsMenuEl);
      secondRowTools = await browser.element(row1ToolsMenuEl).getAttribute("innerHTML");
      console.log(`first row edit ${JSON.stringify(secondRowTools)}`)
    }
    secondRowTools = secondRowTools ? secondRowTools : "";
    // TODO when we know we are on an LM change to equal test
    expect(secondRowTools).to.be.contain("Drop");
  });

  it.skip('the row context menu opens upon click ', async function (browser: NightwatchBrowser) {
    const row1ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[2]//*[@data-testid="member-row--menu"]'));
    const row1ToolsMenuDropEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[2]//*[@data-testid="member-row--menu-drop"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let secondRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row1ToolsMenuEl);
      secondRowTools = (await browser.element(row1ToolsMenuEl)).click();
      await browser.waitForElementVisible(row1ToolsMenuDropEl);

    }
    browser.assert.visible(row1ToolsMenuDropEl);
  });

  it('the row context menu opens opens Edit form when Edit menu item is click ', async function (browser: NightwatchBrowser) {
    const row1ToolsMenuEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[2]//*[@data-testid="member-row--menu"]'));
    const row1ToolsMenuEditEl = locateWith(By.xpath('(//*[@data-testid="member-row"])[2]//*[@data-testid="member-row--menu-edit"]'));
    browser.page.memberListPage().navigate();
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member-row"]'));
    const memberRows = await browser.element.findAll(by.xpath('//*[@data-testid="member-row"]'));
    let secondRowTools;
    if (memberRows.length > 0) {
      await browser.waitForElementPresent(row1ToolsMenuEl);
      secondRowTools = (await browser.element(row1ToolsMenuEl)).click();
      await browser.waitForElementVisible(row1ToolsMenuEditEl);
      (await browser.element(row1ToolsMenuEditEl)).click();
      await browser.waitForElementNotPresent(row1ToolsMenuEl);
    }
    await browser.waitForElementPresent(by.xpath('//*[@data-testid="member--first-name"]'));
    await browser.assert.visible(by.xpath('//*[@data-testid="member--first-name"]'));
  });
});