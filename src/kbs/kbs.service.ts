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
              
            
            
        }catch(e) {
        }

        return ["hi"];
    }
}
