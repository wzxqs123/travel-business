<template>
  <div class="containers">
    <div
      v-show="indexHotelList.includes(userStore.navSel)"
      class="relative"
    >
      <div class="head-bg-com">
        <Image
          v-show="userStore.navSel === 'index'"
          width="100%"
          height="100%"
          :src="indexImg"
          fit="cover"
          :preview="false"
          alt=""
        />
        <Image
          v-show="userStore.navSel === 'hotel'"
          width="100%"
          height="100%"
          :src="hotelImg"
          fit="cover"
          :preview="false"
          alt=""
        />
        <div
          v-show="userStore.navSel === 'index'"
          class="absolute top-[32.65vh] right-[8.33vw] w-[556px] text-[#fff] leading-[26px] text-right"
        >
          <div class="mb-[40px]">
            嗨行旅游致力于整合全国酒店资源，为您提供稳定、高效、安全的分销服务。我们拥有超过60万+的全球酒店资源，涵盖各种类型与档次，满足不同客户的需求。平台支持酒店资源筛选，帮助您高效管理酒店资源。
          </div>
          <div>交易安全有保障的同时，我们的专业团队将为您提供全方位的技术支持与培训服务，确保您的业务顺利开展</div>
        </div>
        <!-- <div class="absolute bottom-[16.11vh] left-[8.33vw]">
          <div class="mb-[40px] text-[54px] font-bold text-[#fff] leading-[76px]">借助酒店科技 - 释放分销潜力</div>
          <div class="flex items-center">
            <div class="mr-[16px] text-[14px] text-[#fff] leading-[20px]">01</div>
            <div class="w-[120px] h-[1px] bg-[#fff]"></div>
            <div class="w-[1px] h-[6px] bg-[#fff]"></div>
            <div class="w-[120px] h-[1px] bg-[rgba(255,255,255,0.3)]"></div>
            <div class="w-[1px] h-[6px] bg-[rgba(255,255,255,0.3)]"></div>
            <div class="w-[120px] h-[1px] bg-[rgba(255,255,255,0.3)]"></div>
            <div class="w-[1px] h-[6px] bg-[rgba(255,255,255,0.3)]"></div>
            <div class="ml-[16px] text-[14px] text-[#fff] leading-[20px]">03</div>
          </div>
        </div> -->
        <div class="absolute right-[8.33vw] bottom-[16.11vh]">
          <div
            class="flex flex-col justify-center items-center w-[194px] h-[68px] mb-[28px] bg-[rgba(255,255,255,0.05)] rounded-[16px] cursor-pointer hover:bg-[rgba(0,0,0,0.4)]"
            @click="onBuyerRegister"
          >
            <div class="text-[14px] leading-[24px] text-[rgba(255,255,255,0.5)]">Buyer Registration</div>
            <div class="font-bold text-[18px] leading-[24px] text-[rgba(255,255,255)]">买家注册 →</div>
          </div>
          <div
            class="flex flex-col justify-center items-center w-[194px] h-[68px] bg-[rgba(255,255,255,0.05)] rounded-[16px] cursor-pointer hover:bg-[rgba(0,0,0,0.4)]"
            @click="onSellerSettled"
          >
            <div class="text-[14px] leading-[24px] text-[rgba(255,255,255,0.5)]">Seller Registration</div>
            <div class="font-bold text-[18px] leading-[24px] text-[rgba(255,255,255)]">卖家入驻 →</div>
          </div>
        </div>
      </div>

      <div class="relative mb-[117px]">
        <div
          class="pt-[50px] pl-[160px] mb-[42px] bg-[#fff] wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <div class="mb-[5px] font-bold text-[50px] text-[#1A1A1A] leading-[70px]">企业优势</div>
          <div class="text-[#D6DDE3] text-[28px] leading-[40px]">Advantage</div>
        </div>
        <!-- 青色渐变背景 -->
        <div class="overflow-hidden w-[850px] h-[1871px] absolute right-0 top-[272px] z-[2] bg-[#fff]">
          <img
            class="block w-[850px] h-[1871px]"
            src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-gradient.png"
            alt=""
          />
        </div>
        <div class="relative z-[3] advantages-com bg-[#fff]">
          <div class="absolute top-[-125px] desktop:right-[230px] desktop:w-[508px] desktop:h-[684px] rounded-[30px] pic-shadow w-[308px] h-[484px] right-[210px] wow fadeInUp">
            <img
              class="block desktop:w-[508px] desktop:h-[684px] rounded-[30px] w-[308px] h-[484px]"
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/advantages-pic.png"
              alt=""
            />
          </div>
          <div class="absolute top-[-67px] right-[28px] w-[153px] h-[134px] wow fadeInUp">
            <img
              class="block w-[153px] h-[134px]"
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/quotation-mark.png"
              alt=""
            />
          </div>
          <div class="absolute top-[240px] right-[-320px] h-[70px] advantage-rotated-text wow fadeInUp">
            <div class="text-[#ECF0F4] text-[60px] font-bold leading-[70px]">ADVANTAGE</div>
          </div>
          <div class="flex justify-between items-center desktop:w-[712px] pb-[82px] mb-[72px] ml-[42px] border-b border-b-solid border-b-[#D8D8D8] w-[612px] wow fadeInUp">
            <div class="flex flex-col">
              <div class="mb-[10px]">
                <span class="text-[50px] text-[#00D7E5] leading-[70px] font-bold">60</span>
                <span class="ml-[6px] text-[20px] text-[#1A1A1A] leading-[28px]">万+</span>
              </div>
              <div class="text-[#1A1A1A] text-[20px] leading-[28px]">酒店资源</div>
            </div>
            <div class="flex flex-col">
              <div class="mb-[10px]">
                <span class="text-[50px] leading-[70px] font-bold">7.0</span>
                <span class="ml-[6px] text-[20px] text-[#1A1A1A] leading-[28px]">万+</span>
              </div>
              <div class="text-[#1A1A1A] text-[20px] leading-[28px]">直签酒店</div>
            </div>
            <div class="flex flex-col">
              <div class="mb-[10px]">
                <span class="text-[50px] text-[#00D7E5] leading-[70px] font-bold">200</span>
                <span class="ml-[6px] text-[20px] text-[#1A1A1A] leading-[28px]">+</span>
              </div>
              <div class="text-[#1A1A1A] text-[20px] leading-[28px]">优质合作伙伴</div>
            </div>
            <div class="flex flex-col">
              <div class="mb-[10px]">
                <span class="text-[50px] leading-[70px] font-bold">24*7</span>
                <span class="ml-[6px] text-[20px] text-[#1A1A1A] leading-[28px]">Hrs</span>
              </div>
              <div class="text-[#1A1A1A] text-[20px] leading-[28px]">专业双语客服支持</div>
            </div>
          </div>
          <div class="box-border w-[894px] min-h-[180px] pt-[50px] pl-[40px] pr-[40px] mb-[35px] experience wow fadeInUp">
            <div class="mb-[16px] text-[#1A1A1A] leading-[42px] text-[30px] font-bold">10年经验</div>
            <div class="text-[#767676] text-[18px] leading-[26px]">嗨行旅游的API技术团队拥有超过10年的技术积累，出色的接口性能是全国伙伴的首选供应商之一。</div>
          </div>
          <div class="box-border w-[86.36%] min-h-[180px] pt-[50px] pl-[40px] pr-[80px] mb-[35px] experience wow fadeInUp">
            <div class="mb-[16px] text-[#1A1A1A] leading-[42px] text-[30px] font-bold">自动化与精准匹配</div>
            <div class="text-[#767676] text-[18px] leading-[26px]">嗨行旅游的酒店API支持端到端自动化，覆盖了从搜索、报价、有价有房验证，到预订和取消的全流程。消除了酒店供应商和分销渠道之间的匹配障碍。</div>
          </div>
          <div class="box-border w-[86.36%] min-h-[180px] pt-[50px] pl-[40px] pr-[80px] mb-[35px] experience wow fadeInUp">
            <div class="mb-[16px] text-[#1A1A1A] leading-[42px] text-[30px] font-bold">API的高效、稳定</div>
            <div class="max-w-[1376px] text-[#767676] text-[18px] leading-[26px]">
              我们深知可靠性和精准性在旅游行业至关重要，在这些方面我们的API表现卓越而稳定，您能够实时访问来自全球的旅游资源，并集成到原有的预订系统或者网站中，让您的客户得到即时确认的预订体验。
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="userStore.navSel === 'index'"
        class="z-[4] relative w-[100%] min-h-[717px] mb-128px course wow fadeInUp"
      >
        <CourseSteps
          :courseArr="courseArr"
          class=""
        />
      </div>
      <!-- <div
        v-show="userStore.navSel === 'index'"
        class="z-[4] relative w-[100%] min-h-[717px] mb-128px course"
      >
        <div class="absolute top-[122px] left-[0] right-0 m-[auto] z-[-1]">
          <div class="text-[194px] font-bold text-center year-text-bg">
            2024
          </div>
        </div>
        <div class="box-border pt-[30px] pl-[160px] mb-[58px]">
          <div
            class="mb-[5px] font-bold text-[50px] text-[#1A1A1A] leading-[70px]"
          >
            企业历程
          </div>
          <div class="text-[#D6DDE3] text-[28px] leading-[40px]">Course</div>
        </div>
        <div class="flex justify-center items-center h-[164px] mb-[34px]">
          <div class="relative w-[362px] h-[10px] first-line-bg">
            <div
              class="absolute left-[84px] bottom-[-8px] z-[1] flex flex-col items-center"
            >
              <div
                class="mb-[10px] text-[#2F2F2F] text-[20px] leading-[28px] font-[500] text-center"
              >
                2022
              </div>
              <div
                class="w-[24px] h-[24px] bg-[#00D7E5] rounded-full blue-circle"
              ></div>
            </div>
            <div
              class="absolute right-[-22px] bottom-[-8px] z-[1] flex flex-col items-center"
            >
              <div
                class="mb-[10px] text-[#2F2F2F] text-[20px] leading-[28px] font-[500] text-center"
              >
                2023
              </div>
              <div
                class="w-[24px] h-[24px] bg-[#00D7E5] rounded-full blue-circle"
              ></div>
            </div>
          </div>
          <div class="relative w-[310px] h-[10px] two-line-bg">
            <div
              class="absolute right-[-82px] top-[-78px] z-[1] flex justify-center items-center w-[164px] h-[164px] blue-star"
            >
              <div class="font-bold text-[24px] text-[#fff] leading-[36px]">
                2024
              </div>
            </div>
          </div>
          <div class="relative w-[310px] h-[10px] three-line-bg"></div>
          <div class="relative w-[362px] h-[10px] four-line-bg">
            <div
              class="absolute left-[-12px] bottom-[-8px] z-[1] flex flex-col items-center"
            >
              <div
                class="w-[24px] h-[24px] bg-[#C7C7C7] rounded-full grey-circle"
              ></div>
            </div>
            <div
              class="absolute right-[94px] bottom-[-8px] z-[1] flex flex-col items-center"
            >
              <div
                class="w-[24px] h-[24px] bg-[#C7C7C7] rounded-full grey-circle"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex justify-between w-[1120px]">
            <div class="flex items-center justify-center course-but-left">
              <IconLeft :size="28" />
            </div>
            <div
              class="w-[570px] pt-[23px] leading-[40px] text-[#2F2F2F] text-[26px] text-center"
            >
              嗨行旅游分销系统全面投入使用，企业已成为垂直旅游行业科技研发的领军者
            </div>
            <div class="flex items-center justify-center course-but-right">
              <IconRight :size="28" />
            </div>
          </div>
        </div>
      </div> -->
      <div
        v-if="userStore.navSel === 'hotel'"
        class="relative z-[2] pt-[52px] px-[160px] mb-[84px]"
      >
        <div class="flex justify-center pr-[86px] pb-[90px]">
          <div class="shrink-0 w-[772px] mt-[76px]">
            <img
              class="block w-[168px] h-[147px] mb-[158px] ml-[52px] wow fadeInUp"
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/quotation-mark-front.png"
              alt=""
            />
            <div class="font-bold text-[#ECF0F4] text-[192px] wow fadeInUp">合作案例</div>
          </div>
          <div class="ml-[28px] wow fadeInUp">
            <div class="pt-[40px] pl-[74px] mb-[32px] text-[#1A1A1A] leading-[36px] text-[22px] font-bold">根据嗨行旅游的技术和渠道优势，高效无缝地连接酒店供应端和渠道端</div>
            <div class="pl-[74px] mb-[40px] leading-[24px] text-[16px] text-[#767675]">
              受益于嗨行旅游的先进技术、渠道覆盖和精细化运营，各合作伙伴与嗨行旅游的合作实现了销量和盈利的双增长，并有效降低了订单的风险问题，满足不同场景与需求，提供丰富的资源，超越行业平均复苏速度。
            </div>
            <div class="relative w-[800px] h-[608px] case-big">
              <img
                class="w-[800px] h-[608px] case-big-pic"
                :src="`https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/case-bigpic-${caseSelIndex}.png`"
                alt=""
              />

              <div class="absolute left-[-413px] top-[-223px] overflow-hidden w-[413px] h-[446px] rounded-[24px] case-small">
                <template
                  v-for="(casePicItem, casePicIndex) in casePicList"
                  :key="casePicIndex"
                >
                  <div
                    v-if="casePicItem.id !== caseSelIndex"
                    class="w-[413px] h-[223px] overflow-hidden"
                  >
                    <img
                      class="block w-full h-full cursor-pointer home-image"
                      :src="`https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/case-pic-${casePicItem.id}.png`"
                      alt=""
                      @click="onTapCasePic(casePicItem.id)"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="box-border w-[100%] min-h-[1020px] relative z-[4] pt-[118px] px-[160px] pb-[145px] distribute-com">
        <div class="flex items-center mb-[140px] distribute-main wow fadeInUp">
          <div class="overflow-hidden w-[50%] h-[308px] rounded-l-[30px]">
            <Image
              width="100%"
              height="308"
              fit="cover"
              :preview="false"
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/distribute-main-left-pic.png"
            />
          </div>
          <div class="relative flex flex-col items-end box-border w-[50%] h-[308px] pt-[90px] pl-[72px] pr-[100px]">
            <div class="flex h-[45px] items-center mb-[27px] wow fadeInUp">
              <div class="text-[#1A1A1A] text-[32px] font-bold leading-[45px]">以分销商身份加入</div>
              <div class="ml-[20px] w-[10px] h-[10px] rounded-full bg-[#FF590F]"></div>
            </div>
            <div class="leading-[26px] text-[#767676] text-[18px] wow fadeInUp text-right">加入我们B2B酒店分销平台，轻松成为连接酒店与客户的桥梁，共创双赢局面</div>
            <div
              class="flex justify-center items-center absolute bottom-[-22px] right-[100px] w-[220px] h-[64px] bg-[#FF590F] rounded-[138px] text-[#fff] font-bold text-[20px] cursor-pointer buyer-register-but"
              @click="onBuyerRegister"
            >
              买家注册
            </div>
          </div>
        </div>
        <div class="flex items-center distribute-main wow fadeInUp">
          <div class="relative flex flex-col box-border w-[50%] h-[308px] pt-[90px] pl-[72px] pr-[100px]">
            <div class="flex h-[45px] items-center mb-[27px] wow fadeInUp">
              <div class="mr-[20px] w-[10px] h-[10px] rounded-full bg-[#00D7E5]"></div>
              <div class="text-[#1A1A1A] text-[32px] font-bold leading-[45px]">以分销商身份加入</div>
            </div>
            <div class="leading-[26px] text-[#767676] text-[18px] wow fadeInUp">成为酒店B2B平台的供应商，您的酒店将拥有更多销售渠道，实现业务多元化</div>
            <div
              class="flex justify-center items-center absolute bottom-[-22px] left-[100px] w-[220px] h-[64px] bg-[#00D7E5] rounded-[138px] text-[#fff] font-bold text-[20px] cursor-pointer seller-settled-but"
              @click="onSellerSettled"
            >
              卖家入驻
            </div>
          </div>
          <div class="overflow-hidden w-[50%] h-[308px] rounded-r-[30px]">
            <Image
              width="100%"
              height="308"
              fit="cover"
              :preview="false"
              src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/supplier-main-right-pic.png"
            />
          </div>
        </div>
      </div>

      <div class="box-border min-h-[924px] pt-[116px]">
        <div class="px-[160px] mb-[77px] wow fadeInUp">
          <div class="flex justify-between items-center mb-[20px]">
            <div class="font-bold text-[130px] leading-[130px] text-[#ECF0F4]">COOPERATE</div>
            <div class="flex justify-between items-center min-w-[295px]">
              <div
                class="flex items-center justify-center course-but-left"
                @click="onSwitch('left')"
              >
                <IconLeft :size="28" />
              </div>
              <div class="leading-[34px] text-[#767675] text-[24px] text-center">
                {{ `0${currentIndex}` }}
              </div>
              <div
                class="flex items-center justify-center course-but-right"
                @click="onSwitch('right')"
              >
                <IconRight :size="28" />
              </div>
            </div>
          </div>
          <div class="font-bold text-[#1A1A1A] text-[50px] leading-[70px]">与万千企业达成合作</div>
        </div>
        <div class="flex justify-center mx-[160px] wow fadeInUp">
          <!-- <img
            class="block w-[100%]"
            src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/cooperative-merchants.png"
            alt=""
          /> -->

          <Carousel
            :style="{
              width: '100%',
              height: '240px',
            }"
            animation-name="fade"
            show-arrow="never"
            :current="currentIndex"
            indicator-type="never"
          >
            <CarouselItem v-for="image in cooperativeImages">
              <img
                :src="image.url"
                :style="{
                  width: '100%',
                }"
              />
            </CarouselItem>
          </Carousel>
        </div>
      </div>
    </div>
    <div
      v-show="userStore.navSel === 'ticket'"
      class="relative w-[100%] h-[100vh]"
    >
      <img
        class="w-[100%] h-[100vh]"
        src="@/assets/background-image-ticket.png"
        alt=""
      />
    </div>
    <div
      v-show="userStore.navSel === 'train'"
      class="relative w-[100%] h-[100vh]"
    >
      <img
        class="w-[100%] h-[100vh]"
        src="@/assets/background-image-train.png"
        alt=""
      />
    </div>
    <div
      v-show="userStore.navSel === 'ticket' || userStore.navSel === 'train'"
      class="h-[262px] bg-[#fff]"
    ></div>
    <div class="relative box-border h-[645px] pt-[174px] pb-[40px] footer-com">
      <div class="absolute top-[-166px] left-[160px] right-[160px] m-[auto] flex justify-between items-center box-border h-[250px] px-[120px] become-a-partner">
        <div>
          <div class="mb-[7px] text-[30px] text-[#fff] font-bold leading-[42px]">成为合作伙伴</div>
          <div class="text-[24px] leading-[34px] text-[rgba(255,255,255,0.5)]">Become Our Partner</div>
        </div>
        <div class="w-[585px] h-[1px] bg-[#fff]"></div>
        <div
          class="flex justify-center items-center w-[220px] h-[70px] bg-[rgba(255,255,255,0.2)] rounded-[16px] cursor-pointer collaboration-inquiry"
          @click="onBuyerRegister"
        >
          <div class="text-[20px] text-[#fff] leading-[28px] font-bold">合作垂询</div>
          <div class="flex justify-center items-center w-[52px] h-[52px] ml-[30px] rounded-[12px] query-but-bg">
            <IconArrowRight
              :size="32"
              :style="{ color: '#fff' }"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center pr-[334px] mb-[45px]">
        <img
          class="w-[67px] h-[48px]"
          src="https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/logo-67x48.png"
          alt=""
        />
        <div class="ml-[12px] text-[#05506D] font-bold text-[42px] leading-[48px] skew-x-[-6deg]">嗨行旅游</div>
      </div>
      <div class="flex justify-end px-[160px] mb-[52px]">
        <div class="flex w-[855px]">
          <div class="mr-[145px]">
            <div class="mb-[20px] text-[16px] text-[#6B7579] leading-[22px]">产品</div>
            <div
              class="mb-[20px] text-[16px] text-[#092A37] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
              @click="goProductPage('/api-call-instructions')"
            >
              开放平台
            </div>
            <div
              class="text-[16px] text-[#092A37] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
              @click="goProductPage('/hotel')"
            >
              酒店
            </div>
          </div>
          <div class="mr-[145px]">
            <div class="mb-[20px] text-[16px] text-[#6B7579] leading-[22px]">支持</div>
            <div
              class="mb-[20px] text-[16px] text-[#092A37] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
              @click="goTermsOfService"
            >
              服务条款
            </div>
            <div
              class="text-[16px] text-[#092A37] leading-[22px] cursor-pointer hover:text-[#00D7E5]"
              @click="goPrivacyPolicy"
            >
              隐私条款
            </div>
          </div>
          <div>
            <div
              v-if="userStore.customerDetail?.tel || userStore.customerDetail?.phone"
              class="mb-[5px] text-[16px] text-[#6B7579] leading-[22px]"
            >
              {{ `电话：${userStore.customerDetail?.tel || userStore.customerDetail?.phone}` }}
            </div>
            <div class="mb-[40px] text-[16px] text-[#6B7579] leading-[22px]">
              {{ `邮箱：${userStore.customerDetail?.email || '-'}` }}
            </div>
            <div>
              <img
                class="block w-[108px] h-[108px]"
                :src="userStore.customerDetail?.weworkQrCodeUrl || userStore.customerDetail?.wechatQrCodeUrl || 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/service-qr-code.jpg'"
                alt=""
              />
              <div class="w-[108px] mt-[22px] text-[16px] text-[#6B7579] leading-[22px] text-center">联系我们</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center text-[14px] text-[#6B7579] leading-[20px]">
        <div>
          © 2018 - 2025 厦门嗨行旅游服务有限公司
          <span
            class="cursor-pointer"
            @click="goFilingBureau"
          >
            闽ICP备18024540号
          </span>
        </div>
        <!-- <div>闽公安网新22354525522416号</div> -->
      </div>
    </div>
  </div>
  <Toast
    :visible="visible"
    textWord="卖家入驻请及时联系平台商谈合作"
  ></Toast>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Image, CarouselItem, Carousel, Message } from '@arco-design/web-vue'
import { IconLeft, IconRight } from '@arco-design/web-vue/es/icon'
import { useUserStore } from '@/store/user'
import Toast from '@/components/toast/index.vue'
import authStore from '@/auth/auth-store'
import useAuth from '@/auth/use-auth'
import useApp from '@/app/use-app'
import CourseSteps from '@/components/course-steps/index.vue'
import { AccountStatus } from '@/composable/company/company.d'
import { useCompony } from '@/composable/company/company'
import indexImg from '@/assets/background-image-index.png'
import hotelImg from '@/assets/background-image-hotel.png'
const router = useRouter()
const userStore = useUserStore()
const { login } = useAuth()
const apps = useApp()
const indexHotelList = ['index', 'hotel']
const caseSelIndex = ref(1)
const { getCompanyInfo } = useCompony()

const casePicList = [
  {
    id: 1,
    url: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/case-pic-1.png',
  },
  {
    id: 2,
    url: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/case-pic-2.png',
  },
  {
    id: 3,
    url: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/case-pic-3.png',
  },
]
const visible = ref(false)
let times: any
const onTapCasePic = (index: number) => {
  clearInterval(times)
  caseSelIndex.value = index
  casePicLoop()
}

const casePicLoop = () => {
  times = setInterval(() => {
    caseSelIndex.value = caseSelIndex.value === 3 ? 1 : caseSelIndex.value + 1
  }, 6000)
}
const goLogin = () => {
  login(apps.appId.value || '', 'b2b').then((res: string) => {
    window.location.href = res
  })
}
// 买家注册
const onBuyerRegister = () => {
  if (authStore.value.token) {
    getCompanyInfo().then((res) => {
      userStore.setBuyerRegisterStatus(res.data?.status)
      userStore.setCompanyInfo(res.data)
      if (userStore.buyerRegisterStatus !== AccountStatus.BAN) {
        router.push('/buyer-register')
      } else {
        Message.error('您的账号已被封禁，请联系客服')
      }
    })
  } else {
    goLogin()
  }
}
const onSellerSettled = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 2000)
}

const courseArr = [
  {
    year: 2018,
    description: '在对旅游行业深入洞察及对科技创新的坚定信念下，企业正式成立',
  },
  {
    year: 2019,
    description: '智慧旅游系统正式上线，大规模接入客户资源，在双端高效链接流量与资源',
  },
  {
    year: 2021,
    description: '与美团、飞猪、同程等 OTA 平台展开深度合作，成为其头部最大的服务商、代理商',
  },
  {
    year: 2022,
    description: '成为小红书、快手抖音等新媒体平台的重要合作伙伴，协助平台打造特色民宿产业带，推动当地旅游经济发展',
  },
  {
    year: 2024,
    description: '嗨行旅游分销系统全面投入使用，企业已成为垂直旅游行业科技研发的领军者',
  },
]

const goProductPage = (url: string) => {
  if (authStore.value.token) {
    getCompanyInfo().then((res) => {
      userStore.setBuyerRegisterStatus(res.data?.status)
      userStore.setCompanyInfo(res.data)
      if (res.data?.status === AccountStatus.IN_REVIEW || !res.data) {
        router.push('/buyer-register')
      } else if (res.data?.status === AccountStatus.NORMAL) {
        router.push(url)
      } else if (res.data?.status === AccountStatus.BAN) {
        Message.error('您的账号已被封禁，请联系客服')
      }
    })
  } else {
    goLogin()
  }
}

onMounted(() => {
  casePicLoop()
})
onUnmounted(() => {
  clearInterval(times)
})
const currentIndex = ref(1)
const cooperativeImages = [
  {
    id: 1,
    url: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/cooperative-merchants.png',
  },
  {
    id: 2,
    url: 'https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/cooperative-merchants-two.png',
  },
]
const onSwitch = (type: string) => {
  if (type == 'left' && currentIndex.value > 1) {
    currentIndex.value--
  } else if (type == 'right' && currentIndex.value != cooperativeImages.length) {
    currentIndex.value++
  }
}
const goTermsOfService = () => {
  // 服务条款
  router.push({ path: '/service-agreement' })
}

const goPrivacyPolicy = () => {
  // 隐私条款
  router.push({ path: '/privacy-policy' })
}
const goFilingBureau = () => {
  // 服务条款
  window.open('https://beian.miit.gov.cn/#/Integrated/recordQuery')
}

const years = [2018, 2019, 2020, 2021, 2024]
const selectedYear1 = ref(2020) // 默认选中 2020
</script>
<style scoped lang="less">
.containers {
  width: 100%;
  position: relative;
  min-width: 1440px;
  // max-width: 1920px;
  background-color: #fff;

  .course-but-left {
    width: 90px;
    height: 90px;
    background: #ffffff;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.1);
    border-radius: 90px 90px 90px 90px;
    &:hover {
      background: #00d7e5;
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
      color: #fff;
      cursor: pointer;
    }
  }
  .course-but-right {
    width: 90px;
    height: 90px;
    background: #ffffff;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.1);
    border-radius: 90px 90px 90px 90px;
    &:hover {
      background: #00d7e5;
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
      color: #fff;
      cursor: pointer;
    }
  }
  .head-bg-com {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .advantages-com {
    box-sizing: border-box;
    // width: 1846px;
    height: 1094px;
    padding: 133px 0 0 160px;
    margin-right: 3.85%;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.05);
    border-radius: 0px 20px 150px 0px;
    .experience {
      box-shadow: 0px 6px 18px 0px rgba(0, 18, 53, 0.03);
      border-radius: 20px 20px 20px 20px;
    }
    .pic-shadow {
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.3);
    }
    .advantage-rotated-text {
      transform: rotate(90deg);
      transform-origin: left top;
    }
  }
  .course {
    background: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/course-bg.png') 0 0 no-repeat;
    background-size: auto 100%;
    .year-text-bg {
      color: transparent; /* 文字颜色设置为透明，让背景渐变显示出来 */
      background: linear-gradient(180deg, #ecf0f4 20%, rgba(255, 255, 255, 1) 100%);
      -webkit-background-clip: text; /* WebKit 浏览器（如 Chrome、Safari） */
      background-clip: text;
    }
    .blue-circle {
      &:hover {
        box-shadow: 0 0 2px 7px rgba(0, 215, 229, 0.2);
      }
    }
    .grey-circle {
      &:hover {
        box-shadow: 0 0 2px 7px rgba(207, 207, 207, 0.2);
      }
    }
    .first-line-bg,
    .two-line-bg {
      background: linear-gradient(270deg, rgba(0, 215.0000023841858, 229.00000154972076, 1), rgba(231.49336695671082, 255, 210.9955796599388, 0.699999988079071));
      border-radius: 30px 0 0 30px;
    }
    .two-line-bg {
      border-radius: 0;
    }
    .three-line-bg,
    .four-line-bg {
      background: linear-gradient(270deg, rgba(207.94642567634583, 207.94642567634583, 207.94642567634583, 1), rgba(239.82142567634583, 239.82142567634583, 239.82142567634583, 0.699999988079071));
    }
    .blue-star {
      background: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-star.png') 0 0 no-repeat;
      background-size: 100% 100%;
    }
  }
  .distribute-com {
    background: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/distribute-com-bg.png') 0 0 no-repeat;
    background-size: 100% 100%;
    .distribute-main {
      background: #ffffff;
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.05);
      border-radius: 30px 30px 30px 30px;
      @keyframes buyerButAnimation {
        0% {
          background: #ff590f;
          transform: translateX(0);
        }
        100% {
          background: #f14a00;
          transform: translateX(8px);
        }
      }
      .buyer-register-but {
        &:hover {
          animation: buyerButAnimation 0.4s linear forwards;
        }
      }
      @keyframes sellerButAnimation {
        0% {
          background: #00d7e5;
          transform: translateX(0);
        }
        100% {
          background: #13d0dc;
          transform: translateX(-8px);
        }
      }
      .seller-settled-but {
        &:hover {
          animation: sellerButAnimation 0.4s linear forwards;
        }
      }
    }
  }
  .footer-com {
    background: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/footer-bg-pic.png') 0 0 no-repeat;
    background-size: 100% 100%;
    .become-a-partner {
      background: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/become-partner-bg.png') 0 0 no-repeat;
      background-size: inherit;
      @keyframes inquiryAnimation {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(8px);
        }
      }
      .collaboration-inquiry {
        &:hover {
          animation: inquiryAnimation 0.4s linear forwards;
        }
        .query-but-bg {
          background: linear-gradient(225deg, #00bcd9 0%, #4af3ff 100%);
        }
      }
    }
  }
  .case-big {
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.3);
    border-radius: 0px 24px 24px 24px;
    .case-big-pic {
      border-radius: 0px 24px 24px 24px;
    }
    .case-small {
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
    }
  }
}

/* 确保年份元素水平居中 */
.course .flex.justify-center {
  justify-content: center;
}

/* 第一个和最后一个年份的特殊样式 */
.line-bg-first {
  margin-right: auto;
}

.line-bg-last {
  margin-left: auto;
}

/* 中间年份的样式 */
.line-bg-middle {
  margin: 0 20px; /* 调整间距以适应不同屏幕宽度 */
}
.home-image {
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
