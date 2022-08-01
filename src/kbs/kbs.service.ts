import { Injectable } from '@nestjs/common';
import { createPublicKey } from 'crypto';
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');


// date eg. 20220801
const url =(date:string) => `https://news.kbs.co.kr/vod/program.do?bcd=0001#${date}&1`

@Injectable()
export class KbsService {
    async getByDate(date:string):Promise<string[]> {
        const texts = [];

        try{
                const browser = await puppeteer.launch({headless:false});
                const page = await browser.newPage();
                await page.goto(url("20220801"));
                await page.waitForSelector("ul#thumbnailNewsList");
                
                const addresses = await page.evaluate(()=> {
                    const a = document.querySelectorAll("ul#thumbnailNewsList > li > a");
                    const temp = [];
                    const baseUrl = "https://news.kbs.co.kr"
                    a.forEach(el => {
                        temp.push(`${baseUrl}${el.getAttribute('href')}`);
                    });
                    return temp;
                })

                console.log(addresses);

                
                for (let i=0; i<addresses.length; i++) {
                    await page.goto(addresses[i]);
                    await page.waitForSelector("div#cont_newstext");
                    const text = await page.evaluate(()=> {
                            const div = document.querySelector("div#cont_newstext");
                            const child = div.getElementsByTagName("div");
                            if (child && child.length>0) {
                                // 이렇게 하면 앵커만 나옴
                                let text= child[0].innerText;
                                console.log(text);
                                return text;
                            } else {
                                let text = div.innerHTML;
                                text = text.replace("<!-- 서비스 기사 -->", "");
                                text = text.replace("<!-- 기사본문 필요한 부분을 치환 -->", "");
                                text = text.replace(/<b>/g, "");
                                text = text.replace(/<\/b>/g, "");
                                const s= text.split("<br>");
                                const f = s.join("\n");
                                console.log(text);
                                return f;
                            }
                        })
                   texts.push(text);
                }
                

               
        }catch(e) {
        }

        return texts;
    }
}
