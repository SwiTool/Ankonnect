export default class UserAgent {
  static androidVersions: string[] = [
    "5.0",
    "5.0.1",
    "5.0.2",
    "5.1",
    "5.1.1",
    "6.0",
    "6.0.1",
    "7.0",
    "7.1",
    "7.1.1",
    "7.1.2",
    "8.0.0",
    "8.1.0",
    "9",
    "10"
  ];
  static androidDevices: string[] = [
    "ONEPLUS A5000 Build/NMF26X",
    "ONEPLUS A5010 Build/NMF27X",
    "FRD-L19 Build/HUAWEIFRD-L19",
    "CLT-L29 Build/HUAWEICLT-L29",
    "MHA-L29 Build/HUAWEIMHA-L29",
    "BLA-L29 Build/HUAWEIBLA-L29",
    "WAS-TL10 Build/HUAWEIWAS-TL10",
    "MI 8 Build/OPM1.171019.011",
    "Redmi Note 5 Build/N2G47H",
    "Mi A1 Build/OPR1.170623.026",
    "SCV38 Build/R16NW",
    "SAMSUNG SM-G950F Build/NRD90M",
    "SAMSUNG SM-G935F Build/MMB29K",
    "SAMSUNG SM-G930T1 Build/MMB29M",
    "SAMSUNG SM-N920T Build/MMB29K",
    "LG G6 Build/N2G47H",
    "LG-H930 Build/N2G47H",
    "4047F Build/NRD90M",
    "SOV31 Build/32.3.C.0.274",
    "SOV37 Build/51.1.C.0.374",
    "HTC 10 Build/OPR1.170623.027",
    "Nexus 5X Build/MTC19V",
    "Pixel XL Build/NDE63N",
    "HTC U Ultra Build/NRD90M",
    "STF-L09 Build/HUAWEISTF-L09",
    "DUK-L09 Build/HUAWEIDUK-L09",
    "BAH-L09 Build/HUAWEIBAH-L09",
    "SAMSUNG SM-T580 Build/MMB29K",
    "B3-A40FHD Build/NRD90M",
    "P027 Build/MRA58L",
    "P00L Build/NRD90M",
    "SOT31 Build/32.3.C.0.290",
    "ARCHOS 133 Oxygen Build/MOB30J"
  ];
  static chromeVersions: string[] = [
    "69.0.3497.100",
    "70.0.3538.67",
    "71.0.3578.80",
    "72.0.3626.96",
    "73.0.3683.86",
    "74.0.3729.169",
    "75.0.3770.80",
    "76.0.3809.87"
    //'77.0.3865.100', // beta
    //'78.0', // dev / canary
  ];
  private constructor() {
    //
  }

  public static getRandomUserAgent(): string {
    const rndVersion = this.androidVersions[
      ~~(Math.random() * this.androidVersions.length)
    ];
    const rndDevice = this.androidDevices[
      ~~(Math.random() * this.androidDevices.length)
    ];
    const rndChromeVersion = this.chromeVersions[
      ~~(Math.random() * this.chromeVersions.length)
    ];
    return `Mozilla/5.0 (Linux; Android ${rndVersion}; ${rndDevice}) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/${rndChromeVersion} Mobile Safari/537.36`;
  }
}
