import stringSimilarity from 'string-similarity';

export class x_cc {
    constructor(page, target_name, first_name, last_name, type, number, cvv, exp_month, exp_year, address, postcode) {
        if (number.length === 16 && cvv.length === 3) {
            this.cc_first_name = first_name;
            this.cc_last_name = last_name;
            this.cc_type = type;
            this.cc_number = number;
            this.cc_cvv = cvv;
            this.cc_exp_month = exp_month;
            this.cc_exp_year = exp_year;
            this.cc_address = address;
            this.cc_postcode = postcode;
            this.targetName = target_name;
        } else {
            console.error('check length of card number or cvv');
        }
        if (!page || !page.type) {
            console.error("❌ 'page' is undefined or invalid in fill()");
            return;
        }
        this.page = page;
        this.cortSearch = '#shopify-section-header > div.site-wrapper > div > div.grid__item.text-right > div > form > input';
        this.searchButton = '#shopify-section-header > div.site-wrapper > div > div.grid__item.text-right > div > form > button';
        this.searchedProducts = '#MainContent > div > div';
        this.checkPage = '#AddToCart';
        this.cardName = '#cc-name';
        this.cardType = '#cc-type';
        this.cardNumber = '#cc-number';
        this.cardSecurity = '#cc-csc';
    }

    async findProducts(product_name) {
        await this.page.type(this.cortSearch, product_name);
        console.log(`searched: ${product_name}`);
        await this.page.click(this.searchButton);
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    }

    async getProducts() {
        const products = await this.page.$$eval(
            this.searchedProducts,
            (items) => {
                const result = {};
                items.forEach((item, index) => {
                    const anchor = item.querySelector(`#MainContent > div > div:nth-child(${index + 1}) > div.product__title.text-center > a`);
                    if (anchor) {
                        const text = anchor.textContent.trim();
                        const nthSelector = `#MainContent > div > div:nth-child(${index + 1}) > div.product__title.text-center > a`;
                        result[text] = {
                            selector: nthSelector,
                            text: anchor.href,
                        };
                    }
                });

                return result;
            }
        );

        console.log(products); // For debugging
        return products;
    }

    async goToCheckout(data) {
        if (!data || data.length === 0) {
            console.log('No options available to iterate.');
            return;
        }

        let highestScore = 0;
        let bestMatchValue = null;

        for (const option of Object.keys(data)) {
            const similarity = stringSimilarity.compareTwoStrings(this.targetName.toLowerCase(), option.toLowerCase());
            console.log(`Comparing "${this.targetName}" vs "${option}" = ${similarity}`);

            if (similarity > highestScore) {
                highestScore = similarity;
                bestMatchValue = data[option];
            }
        }

        if (highestScore > 0.6) {
            console.log(`✅ Best match: ${bestMatchValue}`);
            console.log(bestMatchValue, bestMatchValue['selector']);
            await this.page.click(bestMatchValue['selector']);
        } else {
            console.warn(`⚠️ No close match found for "${this.targetName}"`);
            try {
                console.log(bestMatchValue, bestMatchValue['selector']);
                await this.page.click(bestMatchValue['selector']);
            } catch (error) {
            }
                
        }
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        await this.page.click(this.checkPage);
        await this.page.click('#ProductSection > button.btn.btn--view-cart');
    }


    async fill() {
        // await this.page.waitForSelector(cardName);
        let answer = await this.getInputType(this.cardName);
        console.log(answer);
        await this.page.type(this.cardName, `${this.cc_first_name} ${this.cc_last_name}`);
        answer = await this.getInputType(this.cardType);
        console.log(answer);
        let response = await this.regEx(answer, this.cardType);
        await this.page.select(this.cardType, response);
        console.log(response);
        answer = await this.getInputType(this.cardNumber);
        console.log(answer);
        await this.page.type(this.cardNumber, this.cc_number);
        answer = await this.getInputType(this.cardSecurity);
        console.log(answer);
        await this.page.type(this.cardSecurity, this.cc_cvv);
    }

    async getInputType(inputSelector) {
        try {
            const info = await this.page.$eval(inputSelector, el => {
                const tag = el.tagName.toLowerCase();

                if (tag === 'select') {
                    const options = Array.from(el.options).map(opt => ({
                        text: opt.textContent.trim(),
                        value: opt.value.trim()
                    }));
                    return { tag, type: 'select', options };
                }

                if (tag === 'input') {
                    const type = el.type;

                    if (type === 'radio' || type === 'checkbox') {
                        const name = el.name;
                        const group = document.querySelectorAll(`input[name="${name}"]`);
                        const options = Array.from(group).map(g => ({
                            text: g.nextSibling?.textContent?.trim() || g.value,
                            value: g.value
                        }));
                        return { tag, type, options };
                    }

                    return { tag, type };
                }

                if (tag === 'textarea') {
                    return { tag, type: 'textarea' };
                }

                return { tag, type: 'unknown' };
            });

            return info;
        } catch (err) {
            console.error(`❌ Could not analyze input "${inputSelector}":`, err);
            return null;
        }
    }

    async regEx(possibleSelections, columnName) {
        if (!possibleSelections || !possibleSelections.options || possibleSelections.options.length === 0) {
            console.log('No options available to iterate.');
            return;
        }

        switch (columnName) {
            case this.cardType:
                console.log(`Iterating over options for type: ${possibleSelections.type}`);

                let highestScore = 0;
                let bestMatchValue = null;

                for (const option of possibleSelections.options) {
                    const similarity = stringSimilarity.compareTwoStrings(this.cc_type.toLowerCase(), option.text.toLowerCase());
                    console.log(`Comparing "${this.cc_type}" vs "${option.text}" = ${similarity}`);

                    if (similarity > highestScore) {
                        highestScore = similarity;
                        bestMatchValue = option.value;
                    }
                }

                if (highestScore > 0.6) {
                    console.log(`✅ Best match: ${bestMatchValue}`);
                    return bestMatchValue;
                } else {
                    console.warn(`⚠️ No close match found for "${this.cc_type}"`);
                }
                break;

            default:
                break;
        }
    }

}

export const simple_card_site = 'https://www.crtz.xyz/'; 
