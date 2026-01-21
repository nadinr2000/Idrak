import svgPaths from "./svg-rvmn3an1v5";

function Icon() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1611)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333V10" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667H10.0083" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_1611">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="CardTitle">
      <Icon />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[28px] not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[0.33px]">System Overview</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-1.67px] w-[888px]">An intelligent building management platform with IoT sensors, incident management, AI-powered predictions, and rule-based automation</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_20fr)_minmax(0px,_1fr)] h-[98px] left-0 pb-0 pt-[24px] px-[24px] top-0 w-[982px]" data-name="CardHeader">
      <CardTitle />
      <CardDescription />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[58.33%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 9.16667">
            <path d={svgPaths.p16a0fc00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-20%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 5.83333">
            <path d={svgPaths.p33770900} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[58.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 9.16667">
            <path d={svgPaths.p16a0fc00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_58.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 5.83333">
            <path d={svgPaths.p33770900} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[4px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Hierarchical Navigation</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap">Summary → Building → Floor → Room</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[202.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[12px] h-[60px] items-start left-0 pb-0 pl-[12px] pr-0 pt-[12px] rounded-[10px] top-0 w-[300.667px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[58.33%_83.33%_12.5%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-14.29%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 7.5">
            <path d="M0.833333 6.66667V0.833333" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_83.33%_58.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-14.29%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 7.5">
            <path d="M0.833333 6.66667V0.833333" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 9.16667">
            <path d="M0.833333 8.33333V0.833333" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5.83333">
            <path d="M0.833333 5V0.833333" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_16.67%_12.5%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-20%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5.83333">
            <path d="M0.833333 5V0.833333" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[83.33%] right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 9.16667">
            <path d="M0.833333 8.33333V0.833333" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.67%] left-[8.33%] right-3/4 top-[58.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-3/4 right-[8.33%] top-[66.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f3e8ff] relative rounded-[4px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">{`Automation & Rules`}</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap">{`AI-powered & rule-based actions`}</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36px] relative shrink-0 w-[175.823px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[12px] h-[60px] items-start left-[316.67px] pb-0 pl-[12px] pr-0 pt-[12px] rounded-[10px] top-0 w-[300.667px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.696 18.3333">
            <path d={svgPaths.p1f3cfb80} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#dcfce7] relative rounded-[4px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Admin Controls</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap">{`Users, notifications & preferences`}</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[36px] relative shrink-0 w-[177.625px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[12px] h-[60px] items-start left-[633.33px] pb-0 pl-[12px] pr-0 pt-[12px] rounded-[10px] top-0 w-[300.667px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[122px] w-[934px]" data-name="App">
      <Container2 />
      <Container5 />
      <Container8 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid h-[210px] left-[16px] rounded-[14px] top-[32px] w-[986px]" data-name="Card" style={{ backgroundImage: "linear-gradient(167.977deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 100%)" }}>
      <CardHeader />
      <App />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p26ddc800} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[24px] w-[936.667px]" data-name="CardTitle">
      <Icon4 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[28px] not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[0.33px]">Navigation Flow</p>
    </div>
  );
}

function CardDescription1() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[50px] w-[936.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">Hierarchical drill-down structure</p>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="absolute h-[74px] left-0 top-0 w-[984.667px]" data-name="CardHeader">
      <CardTitle1 />
      <CardDescription1 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#155dfc] h-[21.333px] left-[16px] rounded-[8px] top-[16px] w-[131.833px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Summary Dashboard</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[155.83px] size-[16px] top-[18.67px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[#155dfc] h-[21.333px] left-[179.83px] rounded-[8px] top-[16px] w-[92.042px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Building View</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[279.88px] size-[16px] top-[18.67px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#155dfc] h-[21.333px] left-[303.88px] rounded-[8px] top-[16px] w-[107.688px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Floor Dashboard</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[419.56px] size-[16px] top-[18.67px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#155dfc] h-[21.333px] left-[443.56px] rounded-[8px] top-[16px] w-[111.865px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Room Dashboard</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[563.43px] size-[16px] top-[18.67px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#00a63e] h-[21.333px] left-[587.43px] rounded-[8px] top-[16px] w-[101.885px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">Incident Details</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function App1() {
  return (
    <div className="absolute bg-[#f8fafc] h-[53.333px] left-[24px] rounded-[10px] top-[98px] w-[936.667px]" data-name="App">
      <Badge />
      <Icon5 />
      <Badge1 />
      <Icon6 />
      <Badge2 />
      <Icon7 />
      <Badge3 />
      <Icon8 />
      <Badge4 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[176.667px] left-[16px] rounded-[14px] top-[270.33px] w-[986px]" data-name="Card">
      <CardHeader1 />
      <App1 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f091200} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39897300} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-white border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[3px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon9 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[175.44px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 1: Dashboards</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[81.33px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 14V9.33333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 6.66667V2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 14V8" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V2" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 14V10.6667" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 8V2" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 9.33333H4" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 5.33333H9.33333" id="Vector_8" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 10.6667H14.6667" id="Vector_9" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[329.67px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon10 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[174.33px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 2: Configurations</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[102.64px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14890d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[656.33px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon11 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[174.64px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 3: Settings</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[986px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[58.33%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.p301f2330} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-20%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 7">
            <path d={svgPaths.p3a578900} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[58.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.p301f2330} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_58.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 7">
            <path d={svgPaths.p3a578900} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] text-nowrap top-[-2.33px]">Dashboards</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1.67px]">Monitor system status, sensor health, incidents, and AI predictions across all levels</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[52px] relative shrink-0 w-[577.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading1 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[52px] items-center relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[268.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Summary Dashboard</p>
    </div>
  );
}

function CardDescription2() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[268.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">{`Purpose & Metrics`}</p>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="h-[70px] relative shrink-0 w-[316.667px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <CardTitle2 />
        <CardDescription2 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">Displays:</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[130.219px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Overall system status</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[117.052px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Buildings summary</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[83.958px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Sensor health</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[96.844px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Active incidents</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[210.458px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Critical AI predictions/suggestions</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[75.375px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Trend charts</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[107.031px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Severity overview</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[40px] left-[13.69px] top-0 w-[254.979px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[-1.33px] w-[209px]">Rule-based/AI powered approved actions summary</p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="List Item">
      <Text14 />
      <Text15 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[222px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function DashboardSection() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[250px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph7 />
      <List />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">User Actions:</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute bg-[#eceef2] h-[21px] left-[0.33px] rounded-[8px] top-0 w-[179px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Drill to Area/Building: Map View</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[92.33px] rounded-[8px] top-[30px] w-[96.708px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Incident Detail</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-[29.33px] w-[85.021px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Apply Filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[50.667px] relative shrink-0 w-full" data-name="Container">
      <Badge5 />
      <Badge6 />
      <Badge7 />
    </div>
  );
}

function DashboardSection1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[78.667px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph8 />
      <Container12 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="h-[368.667px] relative shrink-0 w-[316.667px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start px-[24px] py-0 relative size-full">
        <DashboardSection />
        <DashboardSection1 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[463px] relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[0.667px] relative size-full">
          <CardHeader2 />
          <CardContent />
        </div>
      </div>
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[268.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Building View</p>
    </div>
  );
}

function CardDescription3() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[268.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">{`Purpose & Metrics`}</p>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="h-[70px] relative shrink-0 w-[316.667px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <CardTitle3 />
        <CardDescription3 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">Displays:</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[227.083px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Spatial map of floors, rooms, sensors</p>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[174.552px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">{`Active & predicted incidents`}</p>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[224.26px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Building-level summaries/AI insights</p>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text20 />
      <Text21 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[74px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
    </div>
  );
}

function DashboardSection2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[102px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph9 />
      <List1 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">User Actions:</p>
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-0 w-[85.76px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Drill to Floor</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge9() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[93.76px] rounded-[8px] top-0 w-[96.708px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Incident Detail</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge10() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[198.47px] rounded-[8px] top-0 w-[49.969px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge11() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-[29.33px] w-[94.917px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Navigate Back</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[50.667px] relative shrink-0 w-full" data-name="Container">
      <Badge8 />
      <Badge9 />
      <Badge10 />
      <Badge11 />
    </div>
  );
}

function DashboardSection3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[78.667px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph10 />
      <Container13 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="h-[220.667px] relative shrink-0 w-[316.667px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start px-[24px] py-0 relative size-full">
        <DashboardSection2 />
        <DashboardSection3 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_2] bg-white h-[463px] relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[0.667px] relative size-full">
          <CardHeader3 />
          <CardContent1 />
        </div>
      </div>
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[268.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Floor-Level Dashboard</p>
    </div>
  );
}

function CardDescription4() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[268.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">{`Purpose & Metrics`}</p>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="h-[70px] relative shrink-0 w-[316.667px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <CardTitle4 />
        <CardDescription4 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">Displays:</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[73.5px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Floor layout</p>
    </div>
  );
}

function ListItem11() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[120.135px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Room-level sensors</p>
    </div>
  );
}

function ListItem12() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[174.552px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">{`Active & predicted incidents`}</p>
    </div>
  );
}

function ListItem13() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[205.229px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Floor-level summaries/AI insights</p>
    </div>
  );
}

function ListItem14() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text28 />
      <Text29 />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[100px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem11 />
      <ListItem12 />
      <ListItem13 />
      <ListItem14 />
    </div>
  );
}

function DashboardSection4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[128px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph11 />
      <List2 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">User Actions:</p>
    </div>
  );
}

function Badge12() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-0 w-[89.927px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Drill to Room</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge13() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[97.93px] rounded-[8px] top-0 w-[96.708px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Incident Detail</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge14() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[202.64px] rounded-[8px] top-0 w-[49.969px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge15() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-[29.33px] w-[94.917px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Navigate Back</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[50.667px] relative shrink-0 w-full" data-name="Container">
      <Badge12 />
      <Badge13 />
      <Badge14 />
      <Badge15 />
    </div>
  );
}

function DashboardSection5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[78.667px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph12 />
      <Container14 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="h-[246.667px] relative shrink-0 w-[316.667px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start px-[24px] py-0 relative size-full">
        <DashboardSection4 />
        <DashboardSection5 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:1_/_3] bg-white h-[463px] relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[0.667px] relative size-full">
          <CardHeader4 />
          <CardContent2 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_464fr)_minmax(0px,_1fr)] h-[463px] relative shrink-0 w-full" data-name="Container">
      <Card2 />
      <Card3 />
      <Card4 />
    </div>
  );
}

function CardTitle5() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[268.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Room-Level Dashboard</p>
    </div>
  );
}

function CardDescription5() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[268.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">{`Purpose & Metrics`}</p>
    </div>
  );
}

function CardHeader5() {
  return (
    <div className="h-[70px] relative shrink-0 w-[316.667px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <CardTitle5 />
        <CardDescription5 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">Displays:</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[137.594px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Room-specific sensors</p>
    </div>
  );
}

function ListItem15() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text30 />
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[81.292px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Last readings</p>
    </div>
  );
}

function ListItem16() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text32 />
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[242.875px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">{`Active & predicted incidents thresholds`}</p>
    </div>
  );
}

function ListItem17() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text34 />
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[210.167px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Room-level summaries/AI insights</p>
    </div>
  );
}

function ListItem18() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text36 />
      <Text37 />
    </div>
  );
}

function List3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[100px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem15 />
      <ListItem16 />
      <ListItem17 />
      <ListItem18 />
    </div>
  );
}

function DashboardSection6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[128px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph13 />
      <List3 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">User Actions:</p>
    </div>
  );
}

function Badge16() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-0 w-[102.885px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Execute Actions</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge17() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[110.89px] rounded-[8px] top-0 w-[90.927px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Acknowledge</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge18() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-[29.33px] w-[82.677px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">View Trends</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge19() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[90.68px] rounded-[8px] top-[29.33px] w-[49.969px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge20() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[148.65px] rounded-[8px] top-[29.33px] w-[94.917px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Navigate Back</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[50.667px] relative shrink-0 w-full" data-name="Container">
      <Badge16 />
      <Badge17 />
      <Badge18 />
      <Badge19 />
      <Badge20 />
    </div>
  );
}

function DashboardSection7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[78.667px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph14 />
      <Container16 />
    </div>
  );
}

function CardContent3() {
  return (
    <div className="h-[262px] relative shrink-0 w-[317px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start px-[24px] py-0 relative size-full">
        <DashboardSection6 />
        <DashboardSection7 />
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[360px] ml-0 mt-0 relative rounded-[14px] w-[317px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CardHeader5 />
        <CardContent3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function CardTitle6() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[268.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Incident Dashboard</p>
    </div>
  );
}

function CardDescription6() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[268.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">{`Purpose & Metrics`}</p>
    </div>
  );
}

function CardHeader6() {
  return (
    <div className="h-[70px] relative shrink-0 w-[316.667px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <CardTitle6 />
        <CardDescription6 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">Displays:</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[116.26px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Incidents summary</p>
    </div>
  );
}

function ListItem19() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text38 />
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute h-[40px] left-[13.69px] top-0 w-[254.979px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[-1.33px] w-[165px]">Actions Taken summary: AI suggested/rule-based</p>
    </div>
  );
}

function ListItem20() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="List Item">
      <Text40 />
      <Text41 />
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text43() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[254.094px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Incident details: type, severity, timestamp</p>
    </div>
  );
}

function ListItem21() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text42 />
      <Text43 />
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#155dfc] text-[14px] text-nowrap top-[-1.33px]">•</p>
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute h-[20px] left-[13.69px] top-0 w-[224.073px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Location, sensors, suggested actions</p>
    </div>
  );
}

function ListItem22() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <Text44 />
      <Text45 />
    </div>
  );
}

function List4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[118px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem19 />
      <ListItem20 />
      <ListItem21 />
      <ListItem22 />
    </div>
  );
}

function DashboardSection8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[146px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph15 />
      <List4 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[-1.33px]">User Actions:</p>
    </div>
  );
}

function Badge21() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-0 w-[83.948px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">View Details</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge22() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[91.95px] rounded-[8px] top-0 w-[102.885px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Execute Actions</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge23() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-0 rounded-[8px] top-[29.33px] w-[139.219px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Acknowledge/Escalate</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge24() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.333px] left-[147.22px] rounded-[8px] top-[29.33px] w-[49.969px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap">Filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[50.667px] relative shrink-0 w-full" data-name="Container">
      <Badge21 />
      <Badge22 />
      <Badge23 />
      <Badge24 />
    </div>
  );
}

function DashboardSection9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[78.667px] items-start relative shrink-0 w-full" data-name="DashboardSection">
      <Paragraph16 />
      <Container17 />
    </div>
  );
}

function CardContent4() {
  return (
    <div className="h-[264.667px] relative shrink-0 w-[316.667px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start px-[24px] py-0 relative size-full">
        <DashboardSection8 />
        <DashboardSection9 />
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[358.667px] ml-[332px] mt-0 relative rounded-[14px] w-[316.667px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <CardHeader6 />
        <CardContent4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group6 />
      <Group7 />
    </div>
  );
}

function DashboardSection10() {
  return (
    <div className="h-[531px] relative shrink-0 w-[986px]" data-name="DashboardSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container11 />
        <Container15 />
        <Group8 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[975px] items-start left-[16px] top-[479.33px] w-[986px]" data-name="Primitive.div">
      <TabList />
      <DashboardSection10 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p16552480} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3fbe2000} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[3px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon13 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[175.44px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 1: Dashboards</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[81.33px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 14V9.33334" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 6.66667V2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 14V8.00001" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V2" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 14V10.6667" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 8V2" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 9.33334H4" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 5.33334H9.33333" id="Vector_8" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 10.6667H14.6667" id="Vector_9" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="absolute bg-white border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[329.67px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon14 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[174.33px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 2: Configurations</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[102.64px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14890d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2b743f70} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton5() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[656.33px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon15 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[174.64px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 3: Settings</p>
    </div>
  );
}

function TabList1() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[986px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PrimitiveButton3 />
        <PrimitiveButton4 />
        <PrimitiveButton5 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[58.33%_83.33%_12.5%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-14.29%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 9">
            <path d="M1 8V1" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_83.33%_58.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-14.29%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 9">
            <path d="M1 8V1" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M1 10V1" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 7">
            <path d="M1 6V1" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_16.67%_12.5%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-20%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 7">
            <path d="M1 6V1" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[83.33%] right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M1 10V1" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.67%] left-[8.33%] right-3/4 top-[58.33%]" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.33%] left-3/4 right-[8.33%] top-[66.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#faf5ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] text-nowrap top-[-2.33px]">Configurations</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1.67px]">Define system behavior, automation rules, thresholds, and escalation policies</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[52px] relative shrink-0 w-[540.698px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading2 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[12px] h-[52px] items-center relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function CardTitle7() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[936.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Configuration Areas</p>
    </div>
  );
}

function CardDescription7() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[936.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">System behavior and automation rules</p>
    </div>
  );
}

function CardHeader7() {
  return (
    <div className="absolute h-[70px] left-[0.67px] top-[0.67px] w-[984.667px]" data-name="CardHeader">
      <CardTitle7 />
      <CardDescription7 />
    </div>
  );
}

function TableHead() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[196.813px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8.5px]">Configuration Area</p>
    </div>
  );
}

function TableHead1() {
  return (
    <div className="absolute h-[40px] left-[196.81px] top-0 w-[289.677px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8.5px]">Purpose</p>
    </div>
  );
}

function TableHead2() {
  return (
    <div className="absolute h-[40px] left-[486.49px] top-0 w-[884.677px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8.5px]">User Actions</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[40px] left-0 top-0 w-[1371.167px]" data-name="TableRow">
      <TableHead />
      <TableHead1 />
      <TableHead2 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[1371.167px]" data-name="TableHeader">
      <TableRow />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[60.667px] left-0 top-0 w-[196.813px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">Rule-Based Actions</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[60.667px] left-[196.81px] top-0 w-[289.677px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">Define explicit actions for known scenarios</p>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[20px] relative shrink-0 w-[385.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Configure actions per building/floor/room (ventilation, alarms)</p>
      </div>
    </div>
  );
}

function ListItem23() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text46 />
      <Text47 />
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[20px] relative shrink-0 w-[495.51px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] h-[39px] leading-[20px] left-[0.31px] not-italic text-[#0a0a0a] text-[14px] top-[-1px] w-[433px]">Choose automated execution or alarm-only for each rule or based on thresholds</p>
      </div>
    </div>
  );
}

function ListItem24() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text48 />
      <Text49 />
    </div>
  );
}

function ConfigSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[53px] items-start left-[7.51px] top-[8px] w-[448px]" data-name="ConfigSection">
      <ListItem23 />
      <ListItem24 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[60.667px] left-[486.49px] top-0 w-[884.677px]" data-name="TableCell">
      <ConfigSection />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[93px] left-px top-0 w-[958px]" data-name="TableRow">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[84.667px] left-0 top-0 w-[196.813px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[31px]">{`Thresholds & Alerts`}</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[84.667px] left-[196.81px] top-0 w-[289.677px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[31px]">Sensor limits for triggering alarms or actions</p>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[20px] relative shrink-0 w-[267.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Set thresholds per sensor type and location</p>
      </div>
    </div>
  );
}

function ListItem25() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text50 />
      <Text51 />
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[20px] relative shrink-0 w-[488.667px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] h-[20px] leading-[20px] left-[-0.2px] not-italic text-[#0a0a0a] text-[14px] top-0 w-[434px]">Assign alarms to different teams based on locations/building or defined criteria</p>
      </div>
    </div>
  );
}

function ListItem26() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text52 />
      <Text53 />
    </div>
  );
}

function ConfigSection1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[7.51px] top-[8px] w-[461px]" data-name="ConfigSection">
      <ListItem25 />
      <ListItem26 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[85px] left-[486px] top-0 w-[472px]" data-name="TableCell">
      <ConfigSection1 />
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text55() {
  return <div className="basis-0 grow h-[78px] min-h-px min-w-px shrink-0" data-name="Text" />;
}

function ListItem27() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[60px] items-start left-[494px] top-[76px] w-[461px]" data-name="List Item">
      <Text54 />
      <Text55 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[142px] left-px top-[90px] w-[958px]" data-name="TableRow">
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <ListItem27 />
      <p className="absolute font-['Arial:Regular',sans-serif] h-[60px] leading-[20px] left-[507px] not-italic text-[#0a0a0a] text-[14px] top-[76px] w-[433px]">AI monitors trends to suggest adjusted thresholds or new rules for commonly observed scenarios that are not part of rules/lessons learned</p>
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[242px] left-0 top-[40px] w-[971px]" data-name="TableBody">
      <TableRow1 />
      <TableRow2 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[60.667px] left-0 top-0 w-[196.813px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">{`Automation & Escalation`}</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[60.667px] left-[196.81px] top-0 w-[289.677px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">Define escalation rules for incidents</p>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[20px] relative shrink-0 w-[286.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Assign response teams, escalate severity levels</p>
      </div>
    </div>
  );
}

function ListItem28() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text56 />
      <Text57 />
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[20px] relative shrink-0 w-[466.177px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] h-[33px] leading-[20px] left-[0.31px] not-italic text-[#0a0a0a] text-[14px] top-[-1px] w-[431px]">Enable escalation if an incident not attended within specified period of time</p>
      </div>
    </div>
  );
}

function ListItem29() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text58 />
      <Text59 />
    </div>
  );
}

function ConfigSection2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[7.51px] top-[8px] w-[461px]" data-name="ConfigSection">
      <ListItem28 />
      <ListItem29 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[60.667px] left-[486.49px] top-0 w-[884.677px]" data-name="TableCell">
      <ConfigSection2 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[79px] left-0 top-[272px] w-[958px]" data-name="TableRow">
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[36.333px] left-0 top-0 w-[196.813px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[7px]">{`Location & Mapping Settings`}</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[36.333px] left-[196.81px] top-0 w-[289.677px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[7px]">Define buildings, floors, rooms</p>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[20px] relative shrink-0 w-[301.802px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Add/edit building/floor/room names and layouts</p>
      </div>
    </div>
  );
}

function ConfigSection3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[20px] items-start left-[8px] top-[8.33px] w-[868.677px]" data-name="ConfigSection">
      <Text60 />
      <Text61 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[27px] left-[486px] top-0 w-[469px]" data-name="TableCell">
      <ConfigSection3 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[36.333px] left-0 top-[356px] w-[1371.167px]" data-name="TableRow">
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[402px] relative shrink-0 w-[936px]" data-name="Table">
      <TableHeader />
      <TableBody />
      <TableRow3 />
      <TableRow4 />
    </div>
  );
}

function Table1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[402px] items-start left-[25px] overflow-clip pl-0 pr-[-434.5px] py-0 top-[95px] w-[936px]" data-name="Table">
      <Table />
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white h-[497px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader7 />
      <Table1 />
    </div>
  );
}

function ConfigSection4() {
  return (
    <div className="h-[593px] relative shrink-0 w-[986px]" data-name="ConfigSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container20 />
        <Card5 />
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[661px] items-start left-1/2 top-[1512.33px] translate-x-[-50%] w-[986px]" data-name="Primitive.div">
      <TabList1 />
      <ConfigSection4 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[58.33%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6667">
            <path d={svgPaths.p19fd7e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-20%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 9.33333">
            <path d={svgPaths.p1dca5680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[58.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6667">
            <path d={svgPaths.p19fd7e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_58.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 9.33333">
            <path d={svgPaths.p1dca5680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[30px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-[-2.67px]">Sample Flows</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] top-[-1.67px] w-[792px]">This section provides 6 core workflows covering automated rule-based responses and AI-powered predictions for rapid incident resolution and proactive risk management.</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p337986c0} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0f172b] text-[16px] text-nowrap top-[-1.67px]">Automated Actions</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">Rule-based responses</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[48px] relative shrink-0 w-[154.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#faf5ff] content-stretch flex gap-[12px] h-[72px] items-center left-0 pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[256.219px]" data-name="Container">
      <Icon18 />
      <Container24 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pa425e00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3f362a80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2d916e80} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p39fb1460} id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p388a94be} id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 10.8333H13.3333" id="Vector_6" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3936ae00} id="Vector_7" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667H16.6667" id="Vector_8" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p868f800} id="Vector_9" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p23096600} id="Vector_10" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p217ce480} id="Vector_11" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p66d6d00} id="Vector_12" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2a516600} id="Vector_13" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0f172b] text-[16px] text-nowrap top-[-1.67px]">AI Suggestions</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">Intelligent insights</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[48px] relative shrink-0 w-[129.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container26 />
        <Container27 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex gap-[12px] h-[72px] items-center left-[272.22px] pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[256.219px]" data-name="Container">
      <Icon19 />
      <Container28 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1470)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V10" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H10.0083" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_1470">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#0f172b] text-[16px] text-nowrap top-[-1.67px]">Real-time Alerts</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">Multi-channel notifications</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[48px] relative shrink-0 w-[188.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#fff7ed] content-stretch flex gap-[12px] h-[72px] items-center left-[544.44px] pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[256.229px]" data-name="Container">
      <Icon20 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container29 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="basis-0 grow h-[198px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading3 />
        <Paragraph18 />
        <Container34 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[24px] h-[198px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[263px] items-start left-[calc(50%+1.5px)] pb-[0.667px] pl-[32.667px] pr-[29px] pt-[32.667px] rounded-[14px] top-[2844.33px] translate-x-[-50%] w-[989px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Container36 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.32%_12.49%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.3447 36.6754">
            <path d={svgPaths.p2ff855e0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[72px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(173, 70, 255) 0%, rgb(152, 16, 250) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function CardTitle8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[272.031px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0f172b] text-[16px] top-[-1.67px] w-[273px]">Flow 1: Automated Rule-Based Action</p>
      </div>
    </div>
  );
}

function Badge25() {
  return (
    <div className="bg-[#f1f5f9] h-[21.333px] relative rounded-[8px] shrink-0 w-[56.563px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#314158] text-[12px] text-nowrap">6 Steps</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[21.333px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <CardTitle8 />
      <Badge25 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">System automatically detects and responds to incidents using predefined rules</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 grow h-[53.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container39 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function FlowDetail() {
  return (
    <div className="h-[72px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container38 />
        <Container40 />
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[103.333px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[3177.33px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlowDetail />
    </div>
  );
}

function CardTitle9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[904.667px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Process Flow</p>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[52.5px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[40.83px] not-italic text-[#314158] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[81px]">Enter credentials and log in</p>
    </div>
  );
}

function Badge26() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[23.28px] overflow-clip rounded-[8px] top-[60.5px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[81.833px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph20 />
      <Badge26 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3fa14880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1def5380} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M20 16H4" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#1</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon22 />
      <Text62 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[177.833px] relative shrink-0 w-[97.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container41 />
        <Container42 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function Badge27() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[27.83px] overflow-clip rounded-[8px] top-[111px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[122px] left-[-0.12px] top-0 w-[98px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[52.5px] not-italic text-[#314158] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[91px]">Summary Dashboard displays system status, incidents, trends</p>
      <Badge27 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[151.833px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph21 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p2bf8f500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2e657600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2ef4b4f0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1f84a000} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#2</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon24 />
      <Text63 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[247.833px] left-0 top-0 w-[97.448px]" data-name="Container">
      <Container46 />
      <Container47 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[97.45px] top-0 w-[40px]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 grow h-[247.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[52px] left-[8.44px] top-0 w-[89px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[40.85px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[71px]">Critical incident highlighted</p>
    </div>
  );
}

function Badge28() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[21.2px] overflow-clip rounded-[8px] top-[60.5px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[81.833px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph22 />
      <Badge28 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p20aff000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text64() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#3</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon26 />
      <Text64 />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[177.833px] relative shrink-0 w-[97.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container51 />
        <Container52 />
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[41.15px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[70px]">Click incident → Incident Detail View</p>
    </div>
  );
}

function Badge29() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[23.28px] overflow-clip rounded-[8px] top-[78px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph23 />
      <Badge29 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1b362780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9fdde00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#4</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon28 />
      <Text65 />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[195.333px] relative shrink-0 w-[97.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container56 />
        <Container57 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[122.5px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[40.54px] not-italic text-[#314158] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[114px]">Existing rule matched and automated action was taken and logged with timestamp</p>
    </div>
  );
}

function Badge30() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[21.2px] overflow-clip rounded-[8px] top-[111px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[151.833px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph24 />
      <Badge30 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p5e65600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#5</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon30 />
      <Text66 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[247.833px] left-0 top-0 w-[97.448px]" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[97.45px] top-0 w-[40px]" data-name="Container">
      <Icon31 />
    </div>
  );
}

function Container65() {
  return (
    <div className="basis-0 grow h-[247.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[121.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[61.11px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[120px]">Comments can be added by reviewer and status updated to closed</p>
    </div>
  );
}

function Badge31() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[43.28px] overflow-clip rounded-[8px] top-[78px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[137.448px]" data-name="Container">
      <Paragraph25 />
      <Badge31 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3bd07ec0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#6</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[28.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon32 />
      <Text67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[195.333px] relative shrink-0 w-[137.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container66 />
        <Container67 />
      </div>
    </div>
  );
}

function FlowDetail1() {
  return (
    <div className="h-[247.833px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-0 pr-[-0.021px] py-0 relative size-full">
        <Container45 />
        <Container50 />
        <Container55 />
        <Container60 />
        <Container65 />
        <Container68 />
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[30px] h-[343.167px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[3304.67px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle9 />
      <FlowDetail1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[25px] top-[3177.33px]">
      <Card6 />
      <Card7 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[87.5%_42.78%_8.33%_42.78%]" data-name="Vector">
        <div className="absolute inset-[-100.03%_-28.87%_-100.01%_-28.87%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.10722 5.00013">
            <path d={svgPaths.p2cf4dd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_12.5%_29.17%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.3327 28.3333">
            <path d={svgPaths.p15c3f700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[72px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 105, 0) 0%, rgb(245, 73, 0) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function CardTitle10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[276.49px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0f172b] text-[16px] top-[-1.67px] w-[277px]">Flow 2: Real-Time Alert: Rule Matched</p>
      </div>
    </div>
  );
}

function Badge32() {
  return (
    <div className="bg-[#f1f5f9] h-[21.333px] relative rounded-[8px] shrink-0 w-[56.563px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#314158] text-[12px] text-nowrap">6 Steps</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex h-[21.333px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <CardTitle10 />
      <Badge32 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">High-risk incident detected with matching rule but requires manual execution</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="basis-0 grow h-[53.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container70 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function FlowDetail2() {
  return (
    <div className="h-[72px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container69 />
        <Container71 />
      </div>
    </div>
  );
}

function Card8() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[103.333px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[3686.33px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlowDetail2 />
    </div>
  );
}

function CardTitle11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[904.667px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Process Flow</p>
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[87.5px] left-[8px] top-0 w-[95.229px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[48px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[96px]">Receive alert via SMS/email/app for threshold exceedance</p>
    </div>
  );
}

function Badge33() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[28.08px] overflow-clip rounded-[8px] top-[95.5px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute h-[116.833px] left-0 top-[96px] w-[111.229px]" data-name="Container">
      <Paragraph27 />
      <Badge33 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p122cc440} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pebad500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#1</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[15.61px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon34 />
      <Text68 />
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[212.833px] relative shrink-0 w-[111.229px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container72 />
        <Container73 />
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon35 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="basis-0 grow h-[212.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container74 />
        <Container75 />
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[69.875px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[35px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[70px]">Click notification → Incident Detail</p>
    </div>
  );
}

function Badge34() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[17.49px] overflow-clip rounded-[8px] top-[78px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[85.875px]" data-name="Container">
      <Paragraph28 />
      <Badge34 />
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1b362780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9fdde00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text69() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#2</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[2.94px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon36 />
      <Text69 />
    </div>
  );
}

function Container79() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon37 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[69.198px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[34.85px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[53px]">View location, severity, sensors</p>
    </div>
  );
}

function Badge35() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[21.59px] overflow-clip rounded-[8px] top-[78px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[85.198px]" data-name="Container">
      <Paragraph29 />
      <Badge35 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ae94df2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p363c980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text70() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#3</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[2.59px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon38 />
      <Text70 />
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute h-[195.333px] left-0 top-0 w-[85.198px]" data-name="Container">
      <Container82 />
      <Container83 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[85.2px] top-0 w-[40px]" data-name="Container">
      <Icon39 />
    </div>
  );
}

function Container86() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container84 />
        <Container85 />
      </div>
    </div>
  );
}

function Badge36() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[33px] overflow-clip rounded-[8px] top-[114px] w-[62.198px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[30.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">decision</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[150px] left-[8px] top-0 w-[128px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[61px] not-italic text-[#314158] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[120px]">Existing Rule matched but no automated action defined/ did not meet threshold for automated action</p>
      <Badge36 />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute h-[257px] left-[-30.35px] top-[96px] w-[136px]" data-name="Container">
      <Paragraph30 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p5e65600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#4</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[2.59px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(254, 154, 0) 0%, rgb(225, 113, 0) 100%)" }}>
      <Icon40 />
      <Text71 />
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[352.833px] relative shrink-0 w-[85.198px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container87 />
        <Container88 />
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon41 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="basis-0 grow h-[352.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container89 />
        <Container90 />
      </div>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[97px] left-[7.75px] top-[0.33px] w-[116px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] h-[111px] leading-[17.5px] left-[58px] not-italic text-[#314158] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[116px]">Rule-based suggested actions reviewed/modified and confirmed by reviewer</p>
    </div>
  );
}

function Badge37() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[40.75px] overflow-clip rounded-[8px] top-[91.33px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute h-[81.833px] left-0 top-[96px] w-[131.979px]" data-name="Container">
      <Paragraph31 />
      <Badge37 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M8 4L26.6667 16L8 28V4Z" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text72() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#5</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[25.99px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon42 />
      <Text72 />
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[177.833px] relative shrink-0 w-[131.979px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container92 />
        <Container93 />
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon43 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container94 />
        <Container95 />
      </div>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[109.198px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[55.03px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[94px]">Status updated and log is created with timestamp</p>
    </div>
  );
}

function Badge38() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[35.07px] overflow-clip rounded-[8px] top-[78px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[125.198px]" data-name="Container">
      <Paragraph32 />
      <Badge38 />
    </div>
  );
}

function Icon44() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 8V16L21.3333 18.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text73() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#6</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[22.59px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon44 />
      <Text73 />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[195.333px] relative shrink-0 w-[125.198px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container97 />
        <Container98 />
      </div>
    </div>
  );
}

function FlowDetail3() {
  return (
    <div className="h-[352.833px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-0 pr-[-0.01px] py-0 relative size-full">
        <Container76 />
        <Container81 />
        <Container86 />
        <Container91 />
        <Container96 />
        <Container99 />
      </div>
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[30px] h-[340px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[3813.33px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle11 />
      <FlowDetail3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[25px] top-[3686.33px]">
      <Card8 />
      <Card9 />
    </div>
  );
}

function Icon45() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.35%] left-[8.33%] right-1/2 top-[8.3%]" data-name="Vector">
        <div className="absolute inset-[-5%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0014 36.6743">
            <path d={svgPaths.p3d8fd980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-[37.5%] right-1/2 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-33.33%_-25.01%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33383 10.0005">
            <path d={svgPaths.p178c5c48} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[21.35%_73.33%_72.92%_25.01%]" data-name="Vector">
        <div className="absolute inset-[-72.73%_-251.3%_-72.74%_-251.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.99697 5.62531">
            <path d={svgPaths.p132d66c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[43.75%_83.08%_54.6%_14.49%]" data-name="Vector">
        <div className="absolute inset-[-252.57%_-170.97%_-252.53%_-170.95%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.30869 3.99369">
            <path d={svgPaths.p2afa6f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.8%] right-3/4 top-[72.85%]" data-name="Vector">
        <div className="absolute inset-[-193.83%_-50.84%_-193.8%_-50.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.61196 4.19363">
            <path d={svgPaths.p9c55140} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/2 right-[33.33%] top-[54.17%]" data-name="Vector">
        <div className="absolute inset-[-1.67px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 3.33333">
            <path d="M1.66667 1.66667H8.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/2 right-[16.67%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-33.33%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 8.33333">
            <path d={svgPaths.p1a5641c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-1/2 right-[16.67%] top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-1.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 3.33333">
            <path d="M1.66667 1.66667H15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-[66.67%] right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 11.6667">
            <path d={svgPaths.p1f0662c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[52.08%_31.25%_43.75%_64.58%]" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2a46fdf2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[10.42%_22.92%_85.42%_72.92%]" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2a46fdf2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[85.42%_14.58%_10.42%_81.25%]" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2a46fdf2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[31.25%_14.58%_64.58%_81.25%]" data-name="Vector">
        <div className="absolute inset-[-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2a46fdf2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[72px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon45 />
      </div>
    </div>
  );
}

function CardTitle12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[277.74px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0f172b] text-[16px] top-[-1.67px] w-[278px]">Flow 3: Real-Time Alert: AI Suggestion</p>
      </div>
    </div>
  );
}

function Badge39() {
  return (
    <div className="bg-[#f1f5f9] h-[21.333px] relative rounded-[8px] shrink-0 w-[56.563px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#314158] text-[12px] text-nowrap">6 Steps</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex h-[21.333px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <CardTitle12 />
      <Badge39 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">High-risk incident with no rule match - AI provides intelligent recommendations</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="basis-0 grow h-[53.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container101 />
        <Paragraph33 />
      </div>
    </div>
  );
}

function FlowDetail4() {
  return (
    <div className="h-[72px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container100 />
        <Container102 />
      </div>
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[103.333px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[4192.83px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlowDetail4 />
    </div>
  );
}

function CardTitle13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[904.667px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Process Flow</p>
      </div>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[87.5px] left-[8px] top-0 w-[95.229px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[48px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[96px]">Receive alert via SMS/email/app for threshold exceedance</p>
    </div>
  );
}

function Badge40() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[28.08px] overflow-clip rounded-[8px] top-[95.5px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute h-[116.833px] left-0 top-[96px] w-[111.229px]" data-name="Container">
      <Paragraph34 />
      <Badge40 />
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p122cc440} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pebad500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text74() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#1</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[15.61px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon46 />
      <Text74 />
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[212.833px] relative shrink-0 w-[111.229px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container103 />
        <Container104 />
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container106() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon47 />
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="basis-0 grow h-[212.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container105 />
        <Container106 />
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[69.875px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[35px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[70px]">Click notification → Incident Detail</p>
    </div>
  );
}

function Badge41() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[17.49px] overflow-clip rounded-[8px] top-[78px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[85.875px]" data-name="Container">
      <Paragraph35 />
      <Badge41 />
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1b362780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9fdde00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text75() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#2</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[2.94px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon48 />
      <Text75 />
    </div>
  );
}

function Container110() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container108 />
        <Container109 />
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon49 />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container110 />
        <Container111 />
      </div>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[69.198px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[34.85px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[53px]">View location, severity, sensors</p>
    </div>
  );
}

function Badge42() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[21.59px] overflow-clip rounded-[8px] top-[78px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[85.198px]" data-name="Container">
      <Paragraph36 />
      <Badge42 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3ae94df2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p363c980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text76() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#3</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[2.59px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon50 />
      <Text76 />
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute h-[195.333px] left-0 top-0 w-[85.198px]" data-name="Container">
      <Container113 />
      <Container114 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[85.2px] top-0 w-[40px]" data-name="Container">
      <Icon51 />
    </div>
  );
}

function Container117() {
  return (
    <div className="basis-0 grow h-[195.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container115 />
        <Container116 />
      </div>
    </div>
  );
}

function Badge43() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[37px] overflow-clip rounded-[8px] top-[136px] w-[62.198px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[30.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">decision</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[245px] left-[8px] top-0 w-[135px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[68px] not-italic text-[#314158] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[134px]">Rule-Based did not match so fallback to AI suggestion with details about confidence and reasoning behind the suggestion</p>
      <Badge43 />
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute h-[274px] left-[-25.35px] top-[96px] w-[143px]" data-name="Container">
      <Paragraph37 />
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27d7cdf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p141fd2c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1ab24400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9384000} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1bfa3b80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 17.3333H21.3333" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1d3c6020} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 10.6667H26.6667" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2c4da200} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2c37db00} id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p5741a00} id="Vector_11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p327cc100} id="Vector_12" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p4253700} id="Vector_13" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text77() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#4</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[2.59px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(254, 154, 0) 0%, rgb(225, 113, 0) 100%)" }}>
      <Icon52 />
      <Text77 />
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[370.333px] relative shrink-0 w-[85.198px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container118 />
        <Container119 />
      </div>
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon53 />
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="basis-0 grow h-[370.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container120 />
        <Container121 />
      </div>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute h-[52.5px] left-[8px] top-0 w-[115.979px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[58px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[116px]">Suggested actions reviewed/modified and confirmed by reviewer</p>
    </div>
  );
}

function Badge44() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[40.54px] overflow-clip rounded-[8px] top-[76.5px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute h-[103px] left-[0.28px] top-[96.33px] w-[132px]" data-name="Container">
      <Paragraph38 />
      <Badge44 />
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M8 4L26.6667 16L8 28V4Z" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text78() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#5</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[25.99px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon54 />
      <Text78 />
    </div>
  );
}

function Container125() {
  return (
    <div className="h-[177.833px] relative shrink-0 w-[131.979px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container123 />
        <Container124 />
      </div>
    </div>
  );
}

function Icon55() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container126() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon55 />
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container125 />
        <Container126 />
      </div>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[70px] left-[8px] top-0 w-[109.198px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[55.03px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[94px]">Status updated and log is created with timestamp</p>
    </div>
  );
}

function Badge45() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[35.07px] overflow-clip rounded-[8px] top-[78px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute h-[99.333px] left-0 top-[96px] w-[125.198px]" data-name="Container">
      <Paragraph39 />
      <Badge45 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 8V16L21.3333 18.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text79() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#6</p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[22.59px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon56 />
      <Text79 />
    </div>
  );
}

function Container130() {
  return (
    <div className="h-[195.333px] relative shrink-0 w-[125.198px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container128 />
        <Container129 />
      </div>
    </div>
  );
}

function FlowDetail5() {
  return (
    <div className="h-[293px] relative shrink-0 w-[904px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-0 pr-[-0.01px] py-0 relative size-full">
        <Container107 />
        <Container112 />
        <Container117 />
        <Container122 />
        <Container127 />
        <Container130 />
      </div>
    </div>
  );
}

function Card11() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[30px] h-[364px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[4319.83px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle13 />
      <FlowDetail5 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[25px] top-[4192.83px]">
      <Card10 />
      <Card11 />
    </div>
  );
}

function Icon57() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 20">
            <path d={svgPaths.p19d3900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
            <path d={svgPaths.pbdeb780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[72px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 201, 80) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon57 />
      </div>
    </div>
  );
}

function CardTitle14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[257.583px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0f172b] text-[16px] top-[-1.67px] w-[258px]">Flow 4: Proactive Risk Management</p>
      </div>
    </div>
  );
}

function Badge46() {
  return (
    <div className="bg-[#f1f5f9] h-[21.333px] relative rounded-[8px] shrink-0 w-[56.781px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#314158] text-[12px] text-nowrap">4 Steps</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex h-[21.333px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <CardTitle14 />
      <Badge46 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">AI-powered predictive analysis for preventing incidents before they occur</p>
    </div>
  );
}

function Container133() {
  return (
    <div className="basis-0 grow h-[53.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container132 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function FlowDetail6() {
  return (
    <div className="h-[72px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container131 />
        <Container133 />
      </div>
    </div>
  );
}

function Card12() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[103.333px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[4722.83px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlowDetail6 />
    </div>
  );
}

function CardTitle15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[904.667px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Process Flow</p>
      </div>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="absolute h-[35px] left-[8px] top-0 w-[158.167px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[79.47px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[156px]">Open Summary Dashboard/Building Map</p>
    </div>
  );
}

function Badge47() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[61.64px] overflow-clip rounded-[8px] top-[43px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[174.167px]" data-name="Container">
      <Paragraph41 />
      <Badge47 />
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p2bf8f500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2e657600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2ef4b4f0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1f84a000} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text80() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#1</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[47.08px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon58 />
      <Text80 />
    </div>
  );
}

function Container136() {
  return (
    <div className="h-[160.333px] relative shrink-0 w-[174.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container134 />
        <Container135 />
      </div>
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon59 />
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="basis-0 grow h-[160.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container136 />
        <Container137 />
      </div>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="absolute h-[35px] left-[8px] top-0 w-[158.167px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[79.43px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[128px]">View AI risk fault prediction/risk levels</p>
    </div>
  );
}

function Badge48() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[66.07px] overflow-clip rounded-[8px] top-[43px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[174.167px]" data-name="Container">
      <Paragraph42 />
      <Badge48 />
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3e8bfe00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p141fd2c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1ab24400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9384000} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p6e55800} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 17.3333H21.3333" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1d3c6020} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 10.6667H26.6667" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2c4da200} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2c37db00} id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p5741a00} id="Vector_11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p327cc100} id="Vector_12" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p4253700} id="Vector_13" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text81() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#2</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[47.08px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon60 />
      <Text81 />
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute h-[160.333px] left-0 top-0 w-[174.167px]" data-name="Container">
      <Container139 />
      <Container140 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container142() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[174.17px] top-0 w-[40px]" data-name="Container">
      <Icon61 />
    </div>
  );
}

function Container143() {
  return (
    <div className="basis-0 grow h-[160.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container141 />
        <Container142 />
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="absolute h-[52.5px] left-[8px] top-0 w-[158.167px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[79.53px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[144px]">Suggested actions reviewed/modified and executed</p>
    </div>
  );
}

function Badge49() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[61.64px] overflow-clip rounded-[8px] top-[60.5px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container144() {
  return (
    <div className="absolute h-[81.833px] left-0 top-[96px] w-[174.167px]" data-name="Container">
      <Paragraph43 />
      <Badge49 />
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M8 4L26.6667 16L8 28V4Z" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text82() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#3</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[47.08px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon62 />
      <Text82 />
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[177.833px] relative shrink-0 w-[174.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container144 />
        <Container145 />
      </div>
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon63 />
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container146 />
        <Container147 />
      </div>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="absolute h-[35px] left-[8px] top-0 w-[198.167px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[99.53px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[158px]">Status updated and log is created with timestamp</p>
    </div>
  );
}

function Badge50() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[79.55px] overflow-clip rounded-[8px] top-[59px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container149() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[214.167px]" data-name="Container">
      <Paragraph44 />
      <Badge50 />
    </div>
  );
}

function Icon64() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 8V16L21.3333 18.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text83() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#4</p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[67.08px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon64 />
      <Text83 />
    </div>
  );
}

function Container151() {
  return (
    <div className="h-[160.333px] relative shrink-0 w-[214.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container149 />
        <Container150 />
      </div>
    </div>
  );
}

function FlowDetail7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container138 />
        <Container143 />
        <Container148 />
        <Container151 />
      </div>
    </div>
  );
}

function Card13() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[30px] h-[273.167px] items-start left-[25px] pl-[24.667px] pr-[0.667px] py-[24.667px] rounded-[14px] top-[4850.16px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle15 />
      <FlowDetail7 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[25px] top-[4722.83px]">
      <Card12 />
      <Card13 />
    </div>
  );
}

function Icon65() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6705 36.6705">
            <path d={svgPaths.p2fd89c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.48%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5667 21.565">
            <path d={svgPaths.pf9ab00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[72px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(251, 44, 54) 0%, rgb(231, 0, 11) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon65 />
      </div>
    </div>
  );
}

function CardTitle16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[285.813px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0f172b] text-[16px] top-[-1.67px] w-[286px]">Flow 5: Escalation to Higher Authorities</p>
      </div>
    </div>
  );
}

function Badge51() {
  return (
    <div className="bg-[#f1f5f9] h-[21.333px] relative rounded-[8px] shrink-0 w-[56.531px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#314158] text-[12px] text-nowrap">5 Steps</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container153() {
  return (
    <div className="content-stretch flex h-[21.333px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <CardTitle16 />
      <Badge51 />
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">Critical incident escalation workflow with notification chain</p>
    </div>
  );
}

function Container154() {
  return (
    <div className="basis-0 grow h-[53.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container153 />
        <Paragraph45 />
      </div>
    </div>
  );
}

function FlowDetail8() {
  return (
    <div className="h-[72px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container152 />
        <Container154 />
      </div>
    </div>
  );
}

function Card14() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[103.333px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[5162.33px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlowDetail8 />
    </div>
  );
}

function CardTitle17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[904.667px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Process Flow</p>
      </div>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="absolute h-[35px] left-[8.33px] top-0 w-[127px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[56.5px] not-italic text-[#314158] text-[14px] text-center top-[-4px] translate-x-[-50%] w-[113px]">Click incident → Incident Detail</p>
    </div>
  );
}

function Badge52() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[38.63px] overflow-clip rounded-[8px] top-[43px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container155() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[128.135px]" data-name="Container">
      <Paragraph46 />
      <Badge52 />
    </div>
  );
}

function Icon66() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1b362780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pb51000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text84() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#1</p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[24.06px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon66 />
      <Text84 />
    </div>
  );
}

function Container157() {
  return (
    <div className="h-[160.333px] relative shrink-0 w-[128.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container155 />
        <Container156 />
      </div>
    </div>
  );
}

function Icon67() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon67 />
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="basis-0 grow h-[160.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container157 />
        <Container158 />
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="absolute h-[17.5px] left-[8px] top-0 w-[90.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[45.5px] not-italic text-[#314158] text-[14px] text-center text-nowrap top-[-1.67px] translate-x-[-50%]">Review actions</p>
    </div>
  );
}

function Badge53() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[32.22px] overflow-clip rounded-[8px] top-[25.5px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Container160() {
  return (
    <div className="absolute h-[46.833px] left-[10.84px] top-[96px] w-[106.448px]" data-name="Container">
      <Paragraph47 />
      <Badge53 />
    </div>
  );
}

function Icon68() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p101a6580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p76546be} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 12H10.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M21.3333 17.3333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M21.3333 22.6667H10.6667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text85() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#2</p>
      </div>
    </div>
  );
}

function Container161() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[24.06px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon68 />
      <Text85 />
    </div>
  );
}

function Container162() {
  return (
    <div className="absolute h-[142.833px] left-0 top-0 w-[128.135px]" data-name="Container">
      <Container160 />
      <Container161 />
    </div>
  );
}

function Icon69() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[128.14px] top-0 w-[40px]" data-name="Container">
      <Icon69 />
    </div>
  );
}

function Container164() {
  return (
    <div className="basis-0 grow h-[142.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container162 />
        <Container163 />
      </div>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="absolute h-[17.5px] left-[8px] top-0 w-[81.906px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[41px] not-italic text-[#314158] text-[14px] text-center text-nowrap top-[-1.67px] translate-x-[-50%]">Click Escalate</p>
    </div>
  );
}

function Badge54() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[23.51px] overflow-clip rounded-[8px] top-[25.5px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute h-[46.833px] left-[15.11px] top-[96px] w-[97.906px]" data-name="Container">
      <Paragraph48 />
      <Badge54 />
    </div>
  );
}

function Icon70() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1b362780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9fdde00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text86() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#3</p>
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[24.06px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon70 />
      <Text86 />
    </div>
  );
}

function Container167() {
  return (
    <div className="h-[142.833px] relative shrink-0 w-[128.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container165 />
        <Container166 />
      </div>
    </div>
  );
}

function Icon71() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container168() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon71 />
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="basis-0 grow h-[142.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container167 />
        <Container168 />
      </div>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="absolute h-[35px] left-[8px] top-0 w-[112.135px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[55.43px] not-italic text-[#314158] text-[14px] text-center top-[-4px] translate-x-[-50%] w-[103px]">System notifies escalation path</p>
    </div>
  );
}

function Badge55() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[36.54px] overflow-clip rounded-[8px] top-[43px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container170() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[128.135px]" data-name="Container">
      <Paragraph49 />
      <Badge55 />
    </div>
  );
}

function Icon72() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p20aff000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text87() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#4</p>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[24.06px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon72 />
      <Text87 />
    </div>
  );
}

function Container172() {
  return (
    <div className="h-[160.333px] relative shrink-0 w-[128.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container170 />
        <Container171 />
      </div>
    </div>
  );
}

function Icon73() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container173() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon73 />
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="basis-0 grow h-[160.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container172 />
        <Container173 />
      </div>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="absolute h-[17.5px] left-[8px] top-0 w-[76.604px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[38.5px] not-italic text-[#314158] text-[14px] text-center text-nowrap top-[-1.67px] translate-x-[-50%]">Logs actions</p>
    </div>
  );
}

function Badge56() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[18.77px] overflow-clip rounded-[8px] top-[25.5px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute h-[46.833px] left-[37.76px] top-[96px] w-[92.604px]" data-name="Container">
      <Paragraph50 />
      <Badge56 />
    </div>
  );
}

function Icon74() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 8V16L21.3333 18.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text88() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#5</p>
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[44.06px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon74 />
      <Text88 />
    </div>
  );
}

function Container177() {
  return (
    <div className="h-[142.833px] relative shrink-0 w-[168.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container175 />
        <Container176 />
      </div>
    </div>
  );
}

function FlowDetail9() {
  return (
    <div className="h-[160.333px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-0 pr-[-0.01px] py-0 relative size-full">
        <Container159 />
        <Container164 />
        <Container169 />
        <Container174 />
        <Container177 />
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[30px] h-[255.667px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[5289.66px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle17 />
      <FlowDetail9 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[25px] top-[5162.33px]">
      <Card14 />
      <Card15 />
    </div>
  );
}

function Icon75() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.3333 33.3334">
            <path d={svgPaths.p3b1ef740} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_66.67%_66.67%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d="M1.66667 1.66667V10H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.67%] left-1/2 right-[33.33%] top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-14.29%_-25.01%_-14.29%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0004 15.0004">
            <path d={svgPaths.p2c8e2b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[72px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(69, 85, 108) 0%, rgb(49, 65, 88) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Icon75 />
      </div>
    </div>
  );
}

function CardTitle18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[238.979px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0f172b] text-[16px] top-[-1.67px] w-[239px]">{`Flow 6: Audit & Historical Review`}</p>
      </div>
    </div>
  );
}

function Badge57() {
  return (
    <div className="bg-[#f1f5f9] h-[21.333px] relative rounded-[8px] shrink-0 w-[56.563px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.667px] py-[2.667px] relative rounded-[inherit] size-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#314158] text-[12px] text-nowrap">6 Steps</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container179() {
  return (
    <div className="content-stretch flex h-[21.333px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <CardTitle18 />
      <Badge57 />
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#45556c] text-[16px] text-nowrap top-[-1.67px]">Review past incidents with AI-powered insights and trend analysis</p>
    </div>
  );
}

function Container180() {
  return (
    <div className="basis-0 grow h-[53.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container179 />
        <Paragraph51 />
      </div>
    </div>
  );
}

function FlowDetail10() {
  return (
    <div className="h-[72px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container178 />
        <Container180 />
      </div>
    </div>
  );
}

function Card16() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[103.333px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[5584.33px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <FlowDetail10 />
    </div>
  );
}

function CardTitle19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[904.667px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Process Flow</p>
      </div>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="absolute h-[52.5px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[40.76px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[72px]">Navigate to Incident History</p>
    </div>
  );
}

function Badge58() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[23.28px] overflow-clip rounded-[8px] top-[60.5px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container181() {
  return (
    <div className="absolute h-[81.833px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph52 />
      <Badge58 />
    </div>
  );
}

function Icon76() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p8271400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M4 4V10.6667H10.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p161264c0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text89() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#1</p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon76 />
      <Text89 />
    </div>
  );
}

function Container183() {
  return (
    <div className="h-[177.833px] relative shrink-0 w-[97.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container181 />
        <Container182 />
      </div>
    </div>
  );
}

function Icon77() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container184() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon77 />
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container183 />
        <Container184 />
      </div>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="absolute h-[52.5px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[41.02px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[73px]">View trends and summary</p>
    </div>
  );
}

function Badge59() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[27.72px] overflow-clip rounded-[8px] top-[60.5px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Container186() {
  return (
    <div className="absolute h-[81.833px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph53 />
      <Badge59 />
    </div>
  );
}

function Icon78() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p101a6580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p76546be} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 12H10.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M21.3333 17.3333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M21.3333 22.6667H10.6667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text90() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#2</p>
      </div>
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon78 />
      <Text90 />
    </div>
  );
}

function Container188() {
  return (
    <div className="absolute h-[177.833px] left-0 top-0 w-[97.448px]" data-name="Container">
      <Container186 />
      <Container187 />
    </div>
  );
}

function Icon79() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[97.45px] top-0 w-[40px]" data-name="Container">
      <Icon79 />
    </div>
  );
}

function Container190() {
  return (
    <div className="basis-0 grow h-[177.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container188 />
        <Container189 />
      </div>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="absolute h-[17.5px] left-[8px] top-0 w-[73.531px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[37.5px] not-italic text-[#314158] text-[14px] text-center text-nowrap top-[-1.67px] translate-x-[-50%]">Apply filters</p>
    </div>
  );
}

function Badge60() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[19.32px] overflow-clip rounded-[8px] top-[25.5px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container191() {
  return (
    <div className="absolute h-[46.833px] left-[3.96px] top-[96px] w-[89.531px]" data-name="Container">
      <Paragraph54 />
      <Badge60 />
    </div>
  );
}

function Icon80() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3cc2c7f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p4344e00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text91() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#3</p>
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon80 />
      <Text91 />
    </div>
  );
}

function Container193() {
  return (
    <div className="h-[142.833px] relative shrink-0 w-[97.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container191 />
        <Container192 />
      </div>
    </div>
  );
}

function Icon81() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container194() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon81 />
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="basis-0 grow h-[142.833px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container193 />
        <Container194 />
      </div>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="absolute h-[35px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[40.89px] not-italic text-[#314158] text-[14px] text-center top-[-1.67px] translate-x-[-50%] w-[77px]">View details and timeline</p>
    </div>
  );
}

function Badge61() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[27.72px] overflow-clip rounded-[8px] top-[43px] w-[42.01px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[20.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">view</p>
    </div>
  );
}

function Container196() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph55 />
      <Badge61 />
    </div>
  );
}

function Icon82() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27d7cdf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p141fd2c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1ab24400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p9384000} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1bfa3b80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 17.3333H21.3333" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1d3c6020} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 10.6667H26.6667" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2c4da200} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2c37db00} id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p5741a00} id="Vector_11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p327cc100} id="Vector_12" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p4253700} id="Vector_13" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text92() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#4</p>
      </div>
    </div>
  );
}

function Container197() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(144, 161, 185) 0%, rgb(98, 116, 142) 100%)" }}>
      <Icon82 />
      <Text92 />
    </div>
  );
}

function Container198() {
  return (
    <div className="h-[160.333px] relative shrink-0 w-[97.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container196 />
        <Container197 />
      </div>
    </div>
  );
}

function Icon83() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container199() {
  return (
    <div className="h-[64px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon83 />
      </div>
    </div>
  );
}

function Container200() {
  return (
    <div className="basis-0 grow h-[160.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container198 />
        <Container199 />
      </div>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="absolute h-[35px] left-[8px] top-0 w-[81.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[40.04px] not-italic text-[#314158] text-[14px] text-center top-0 translate-x-[-50%] w-[49px]">Export report</p>
    </div>
  );
}

function Badge62() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[23.28px] overflow-clip rounded-[8px] top-[43px] w-[50.885px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">action</p>
    </div>
  );
}

function Container201() {
  return (
    <div className="absolute h-[64.333px] left-0 top-[96px] w-[97.448px]" data-name="Container">
      <Paragraph56 />
      <Badge62 />
    </div>
  );
}

function Icon84() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p110a37f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p47ef100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 20V4" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text93() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#5</p>
      </div>
    </div>
  );
}

function Container202() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[8.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <Icon84 />
      <Text93 />
    </div>
  );
}

function Container203() {
  return (
    <div className="absolute h-[160.333px] left-0 top-0 w-[97.448px]" data-name="Container">
      <Container201 />
      <Container202 />
    </div>
  );
}

function Icon85() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container204() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[97.45px] top-0 w-[40px]" data-name="Container">
      <Icon85 />
    </div>
  );
}

function Container205() {
  return (
    <div className="basis-0 grow h-[160.333px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container203 />
        <Container204 />
      </div>
    </div>
  );
}

function Badge63() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[21.333px] left-[33.09px] overflow-clip rounded-[8px] top-[101px] w-[55.052px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[27.5px] not-italic text-[#0a0a0a] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">system</p>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="absolute h-[122.5px] left-[8px] top-0 w-[121.448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[17.5px] left-[57.09px] not-italic text-[#314158] text-[14px] text-center top-0 translate-x-[-50%] w-[134px]">AI report summary: Suggest correlations, preventive measures, insights based on applied filters</p>
      <Badge63 />
    </div>
  );
}

function Container206() {
  return (
    <div className="absolute h-[151.833px] left-0 top-[96px] w-[137.448px]" data-name="Container">
      <Paragraph57 />
    </div>
  );
}

function Icon86() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3cc2c7f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p4344e00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text94() {
  return (
    <div className="h-[16px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-white top-[-1px] w-[14px]">#6</p>
      </div>
    </div>
  );
}

function Container207() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center justify-center left-[28.72px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(98, 116, 142) 0%, rgb(69, 85, 108) 100%)" }}>
      <Icon86 />
      <Text94 />
    </div>
  );
}

function Container208() {
  return (
    <div className="h-[247.833px] relative shrink-0 w-[137.448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container206 />
        <Container207 />
      </div>
    </div>
  );
}

function FlowDetail11() {
  return (
    <div className="h-[247.833px] relative shrink-0 w-[904.667px]" data-name="FlowDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-0 pr-[-0.021px] py-0 relative size-full">
        <Container185 />
        <Container190 />
        <Container195 />
        <Container200 />
        <Container205 />
        <Container208 />
      </div>
    </div>
  );
}

function Card17() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[30px] h-[343.167px] items-start left-[25px] pb-[0.667px] pl-[24.667px] pr-[0.667px] pt-[24.667px] rounded-[14px] top-[5711.66px] w-[954px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle19 />
      <FlowDetail11 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[25px] top-[5584.33px]">
      <Card16 />
      <Card17 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="h-[5798px] relative shrink-0 w-[1018px]" data-name="Main Content">
      <Card />
      <Card1 />
      <PrimitiveDiv />
      <PrimitiveDiv1 />
      <Container37 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group2 />
      <Group1 />
      <Group />
    </div>
  );
}

function App2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[6223px] items-start left-[-7px] pb-0 pt-[104.667px] px-0 top-0 w-[1025px]" data-name="App" style={{ backgroundImage: "linear-gradient(99.3533deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)" }}>
      <MainContent />
    </div>
  );
}

function Icon87() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 29.3333">
            <path d={svgPaths.p23de6900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-1/2" data-name="Vector">
        <div className="absolute inset-[-10%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 16">
            <path d={svgPaths.p37309d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-3/4 right-[8.33%] top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 20">
            <path d={svgPaths.p17533c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[41.67%] right-[41.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-1.33px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2.66667">
            <path d="M1.33333 1.33333H6.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_41.67%_58.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-1.33px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2.66667">
            <path d="M1.33333 1.33333H6.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_41.67%_41.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-1.33px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2.66667">
            <path d="M1.33333 1.33333H6.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[41.67%] right-[41.67%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-1.33px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2.66667">
            <path d="M1.33333 1.33333H6.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[48px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(21, 93, 252) 0%, rgb(152, 16, 250) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon87 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="font-['Arial:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#0a0a0a] text-[24px] text-nowrap">IDRAK: CBRNE BMS</p>
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">{`Requirements Summary & System Map`}</p>
    </div>
  );
}

function Container210() {
  return (
    <div className="h-[56px] relative shrink-0 w-[326.146px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph58 />
      </div>
    </div>
  );
}

function Container211() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center relative shrink-0 w-full" data-name="Container">
      <Container209 />
      <Container210 />
    </div>
  );
}

function App3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[104.667px] items-start left-0 pb-[0.667px] pt-[24px] px-[16px] top-0 w-[1018px]" data-name="App">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Container211 />
    </div>
  );
}

function Icon88() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p16552480} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3fbe2000} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton6() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[3px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon88 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[175.44px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 1: Dashboards</p>
    </div>
  );
}

function Icon89() {
  return (
    <div className="absolute left-[81.33px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 14V9.33334" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 6.66667V2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 14V8.00001" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V2" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 14V10.6667" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 8V2" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 9.33334H4" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 5.33334H9.33333" id="Vector_8" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 10.6667H14.6667" id="Vector_9" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton7() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[329.67px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon89 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[174.33px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 2: Configurations</p>
    </div>
  );
}

function Icon90() {
  return (
    <div className="absolute left-[102.64px] size-[16px] top-[5.83px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14890d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2b743f70} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton8() {
  return (
    <div className="absolute bg-white border-[0.667px] border-[rgba(0,0,0,0)] border-solid h-[29px] left-[656.33px] rounded-[14px] top-[3.5px] w-[326.667px]" data-name="Primitive.button">
      <Icon90 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[174.64px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[2.5px] translate-x-[-50%]">Part 3: Settings</p>
    </div>
  );
}

function TabList2() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[986px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PrimitiveButton6 />
        <PrimitiveButton7 />
        <PrimitiveButton8 />
      </div>
    </div>
  );
}

function Icon91() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.43%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0352 22">
            <path d={svgPaths.p2eb1aa00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container212() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon91 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] text-nowrap top-[-2.33px]">Settings</p>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-1.67px]">Manage users, roles, notifications, and system-level preferences</p>
    </div>
  );
}

function Container213() {
  return (
    <div className="h-[52px] relative shrink-0 w-[447.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading4 />
        <Paragraph59 />
      </div>
    </div>
  );
}

function Container214() {
  return (
    <div className="content-stretch flex gap-[12px] h-[52px] items-center relative shrink-0 w-full" data-name="Container">
      <Container212 />
      <Container213 />
    </div>
  );
}

function CardTitle20() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[936.667px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-1.67px]">Administrative Settings</p>
    </div>
  );
}

function CardDescription8() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[46px] w-[936.667px]" data-name="CardDescription">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-1.67px]">System-level preferences and user management</p>
    </div>
  );
}

function CardHeader8() {
  return (
    <div className="absolute h-[70px] left-[0.67px] top-[0.67px] w-[984.667px]" data-name="CardHeader">
      <CardTitle20 />
      <CardDescription8 />
    </div>
  );
}

function TableHead3() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[222.427px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8.5px]">Settings Area</p>
    </div>
  );
}

function TableHead4() {
  return (
    <div className="absolute h-[40px] left-[196.43px] top-0 w-[268.438px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8.5px]">Purpose</p>
    </div>
  );
}

function TableHead5() {
  return (
    <div className="absolute h-[40px] left-[465.86px] top-0 w-[312.969px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8.5px]">User Actions</p>
    </div>
  );
}

function TableHead6() {
  return (
    <div className="absolute h-[40px] left-[730.33px] top-[-1.67px] w-[221px]" data-name="TableHead">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[11.67px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[9.67px]">Notes</p>
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[40px] left-0 top-0 w-[938px]" data-name="TableRow">
      <TableHead3 />
      <TableHead4 />
      <TableHead5 />
      <TableHead6 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="absolute h-[40px] left-[0.33px] top-[0.33px] w-[935px]" data-name="TableHeader">
      <TableRow5 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[60px] left-[0.33px] top-[0.33px] w-[170px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">{`User & Role Management`}</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[60.667px] left-[196.43px] top-0 w-[268.438px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">Control access and permissions</p>
    </div>
  );
}

function Text95() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text96() {
  return (
    <div className="h-[20px] relative shrink-0 w-[134.302px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Add/edit/delete users</p>
      </div>
    </div>
  );
}

function ListItem30() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text95 />
      <Text96 />
    </div>
  );
}

function Text97() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text98() {
  return (
    <div className="h-[20px] relative shrink-0 w-[232.083px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Assign roles (admin, operator, viewer)</p>
      </div>
    </div>
  );
}

function ListItem31() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text97 />
      <Text98 />
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[44px] items-start left-[8px] top-[8.33px] w-[296.969px]" data-name="SettingsSection">
      <ListItem30 />
      <ListItem31 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[60px] left-[466.33px] top-[0.33px] w-[257px]" data-name="TableCell">
      <SettingsSection />
    </div>
  );
}

function Badge64() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[49px] left-[7.67px] overflow-clip rounded-[8px] top-[7.67px] w-[182px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[8px] not-italic text-[#0a0a0a] text-[12px] top-0 w-[197px]">Permissions affect which dashboards and configuration options are accessible</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[61px] left-[730.33px] top-[-1.67px] w-[221px]" data-name="TableCell">
      <Badge64 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[61px] left-0 top-0 w-[938px]" data-name="TableRow">
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[61px] left-[0.33px] top-[-0.33px] w-[170px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">{`Notification & Alerts`}</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[60.667px] left-[196.43px] top-0 w-[268.438px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[19px]">Manage communication channels</p>
    </div>
  );
}

function Text99() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text100() {
  return (
    <div className="h-[20px] relative shrink-0 w-[203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.31px] not-italic text-[#0a0a0a] text-[14px] top-[-1px] w-[242px]">Configure email, SMS, or system notifications</p>
      </div>
    </div>
  );
}

function ListItem32() {
  return (
    <div className="content-stretch flex gap-[8px] h-[38px] items-start relative shrink-0 w-[210px]" data-name="List Item">
      <Text99 />
      <Text100 />
    </div>
  );
}

function Text101() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text102() {
  return (
    <div className="h-[20px] relative shrink-0 w-[122.76px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Set escalation paths</p>
      </div>
    </div>
  );
}

function ListItem33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text101 />
      <Text102 />
    </div>
  );
}

function SettingsSection1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[68px] items-start left-[8.14px] top-[9px] w-[256px]" data-name="SettingsSection">
      <ListItem32 />
      <ListItem33 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[60.667px] left-[465.86px] top-0 w-[312.969px]" data-name="TableCell">
      <SettingsSection1 />
    </div>
  );
}

function Badge65() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[39px] left-[8px] overflow-clip rounded-[8px] top-[20px] w-[182px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[8.33px] not-italic text-[#0a0a0a] text-[12px] top-[1.33px] w-[168px]">Alerts integrate with dashboards and AI suggestions</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[61px] left-[730px] top-[-2px] w-[208px]" data-name="TableCell">
      <Badge65 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[84px] left-0 top-[60px] w-[938px]" data-name="TableRow">
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[39px] left-[0.33px] top-0 w-[170px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] top-[8px] w-[162px]">{`Display & Dashboard Preferences`}</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[38.667px] left-[196.43px] top-0 w-[268.438px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[8px]">Customize user experience</p>
    </div>
  );
}

function Text103() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text104() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.45px] not-italic text-[#0a0a0a] text-[14px] top-[-1.33px] w-[226px]">Set default dashboards, layout, charts, themes</p>
      </div>
    </div>
  );
}

function SettingsSection2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[20px] items-start left-[8px] top-[9.33px] w-[296.969px]" data-name="SettingsSection">
      <Text103 />
      <Text104 />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[38.667px] left-[465.86px] top-0 w-[312.969px]" data-name="TableCell">
      <SettingsSection2 />
    </div>
  );
}

function Badge66() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[38px] left-[8px] overflow-clip rounded-[8px] top-[9px] w-[182px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[8.33px] not-italic text-[#0a0a0a] text-[12px] top-[1.33px] w-[188px]">Personalization does not affect system logic or AI actions</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[39px] left-[730px] top-[-2px] w-[221px]" data-name="TableCell">
      <Badge66 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[55px] left-0 top-[144px] w-[938px]" data-name="TableRow">
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[84px] left-[0.33px] top-[0.33px] w-[170px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[31px]">System-Level Options</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[84.333px] left-[196.43px] top-0 w-[268.438px]" data-name="TableCell">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[31px]">Global options affecting system behavior</p>
    </div>
  );
}

function Text105() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text106() {
  return (
    <div className="h-[20px] relative shrink-0 w-[109.042px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Backup schedules</p>
      </div>
    </div>
  );
}

function ListItem34() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text105 />
      <Text106 />
    </div>
  );
}

function Text107() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text108() {
  return (
    <div className="h-[20px] relative shrink-0 w-[126.646px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Logging preferences</p>
      </div>
    </div>
  );
}

function ListItem35() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text107 />
      <Text108 />
    </div>
  );
}

function Text109() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[-1.33px]">•</p>
      </div>
    </div>
  );
}

function Text110() {
  return (
    <div className="h-[20px] relative shrink-0 w-[66.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.33px]">Audit trails</p>
      </div>
    </div>
  );
}

function ListItem36() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text109 />
      <Text110 />
    </div>
  );
}

function SettingsSection3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[68px] items-start left-[8px] top-[8.33px] w-[296.969px]" data-name="SettingsSection">
      <ListItem34 />
      <ListItem35 />
      <ListItem36 />
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[84.333px] left-[465.86px] top-0 w-[312.969px]" data-name="TableCell">
      <SettingsSection3 />
    </div>
  );
}

function Badge67() {
  return (
    <div className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[39px] left-[4px] overflow-clip rounded-[8px] top-[26px] w-[182px]" data-name="Badge">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[8.33px] not-italic text-[#0a0a0a] text-[12px] top-[1.33px] w-[169px]">Supports operational review and auditing</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[85px] left-[730px] top-[-2px] w-[191px]" data-name="TableCell">
      <Badge67 />
    </div>
  );
}

function TableRow9() {
  return (
    <div className="absolute h-[85px] left-[-1px] top-[199px] w-[939px]" data-name="TableRow">
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function TableBody1() {
  return (
    <div className="absolute h-[244px] left-[0.33px] top-[40.33px] w-[949px]" data-name="TableBody">
      <TableRow6 />
      <TableRow7 />
      <TableRow8 />
      <TableRow9 />
    </div>
  );
}

function Table2() {
  return (
    <div className="h-[284px] relative shrink-0 w-[963px]" data-name="Table">
      <TableHeader1 />
      <TableBody1 />
    </div>
  );
}

function Table3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[299.667px] items-start left-[24.67px] pl-0 pr-[-323.021px] py-0 top-[94.67px] w-[936.667px]" data-name="Table">
      <Table2 />
    </div>
  );
}

function Card18() {
  return (
    <div className="bg-white h-[419px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader8 />
      <Table3 />
    </div>
  );
}

function SettingsSection4() {
  return (
    <div className="h-[487px] relative shrink-0 w-[986px]" data-name="SettingsSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container214 />
        <Card18 />
      </div>
    </div>
  );
}

function PrimitiveDiv2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[555px] items-start left-[calc(50%-2.5px)] top-[2336px] translate-x-[-50%] w-[993px]" data-name="Primitive.div">
      <TabList2 />
      <SettingsSection4 />
    </div>
  );
}

export default function DashboardRequirementSummary() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard Requirement Summary">
      <App2 />
      <App3 />
      <PrimitiveDiv2 />
    </div>
  );
}