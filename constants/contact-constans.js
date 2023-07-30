// export const releaseEmailRegexp = { minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] }, };
export const releaseEmailRegexp =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const releasePhoneRegexp =
  /\+?\d{1,4}?[-.\s]?[- ]?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
