const math = Math;

class CanadianFWI {
  constructor(temp, rhum, wind, prcp) {
    this.h = rhum;
    this.t = temp;
    this.w = wind;
    this.p = prcp;
  }

  FFMCcalc(ffmc0) {
    let mo = (147.2 * (101.0 - ffmc0)) / (59.5 + ffmc0);
    if (this.p > 0.5) {
      const rf = this.p - 0.5;
      mo = mo + 42.5 * rf * math.exp(-100.0 / (251.0 - mo)) * (1.0 - math.exp(-6.93 / rf));
      if (mo > 250.0) mo = 250.0;
    }
    const ed = (0.942 * (this.h ** 0.679) + (11.0 * math.exp((this.h - 100.0) / 10.0)) +
      0.18 * (21.1 - this.t) * (1.0 - 1.0 / math.exp(0.115 * this.h)));
    const ew = (0.618 * (this.h ** 0.753) + (10.0 * math.exp((this.h - 100.0) / 10.0)) +
      0.18 * (21.1 - this.t) * (1.0 - 1.0 / math.exp(0.115 * this.h)));
    const kl = (0.424 * (1.0 - ((100.0 - this.h) / 100.0) ** 1.7) +
      (0.0694 * math.sqrt(this.w)) * (1.0 - ((100.0 - this.h) / 100.0) ** 8));
    const kw = kl * (0.581 * math.exp(0.0365 * this.t));
    const m = ew - (ew - mo) / (10.0 ** kw);
    const ffmc = (59.5 * (250.0 - m)) / (147.2 + m);
    return Math.min(101, Math.max(0, ffmc));
  }

  DMCcalc(dmc0, mth) {
    const el = [6.5, 7.5, 9.0, 12.8, 13.9, 13.9, 12.4, 10.9, 9.4, 8.0, 7.0, 6.0];
    const rk = 1.894 * (this.t + 1.1) * (100.0 - this.h) * (el[mth - 1] * 0.0001);
    const dmc = dmc0 + rk;
    return Math.max(1, dmc);
  }

  DCcalc(dc0, mth) {
    const fl = [-1.6, -1.6, -1.6, 0.9, 3.8, 5.8, 6.4, 5.0, 2.4, 0.4, -1.6, -1.6];
    const pe = (0.36 * (this.t + 2.8) + fl[mth - 1]) / 2;
    return dc0 + Math.max(0, pe);
  }

  ISIcalc(ffmc) {
    const mo = (147.2 * (101.0 - ffmc)) / (59.5 + ffmc);
    const ff = 19.115 * math.exp(mo * -0.1386) * (1.0 + (mo ** 5.31) / 49300000.0);
    return ff * math.exp(0.05039 * this.w);
  }

  BUIcalc(dmc, dc) {
    return dmc <= 0.4 * dc
      ? (0.8 * dc * dmc) / (dmc + 0.4 * dc)
      : dmc - (1.0 - 0.8 * dc / (dmc + 0.4 * dc)) * (0.92 + (0.0114 * dmc) ** 1.7);
  }

  FWIcalc(isi, bui) {
    const bb = bui <= 80.0
      ? 0.1 * isi * (0.626 * bui ** 0.809 + 2.0)
      : 0.1 * isi * (1000.0 / (25.0 + 108.64 / math.exp(0.023 * bui)));
    return bb <= 1.0 ? bb : math.exp(2.72 * (0.434 * math.log(bb)) ** 0.647);
  }
}

module.exports =  CanadianFWI ;
