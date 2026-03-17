/*
 * @Author: Czy
 * @Date: 2025-02-05 13:57:59
 * @FilePath: /b2b-official-website/src/utils/index.ts
 *
 */
function fallbackCopyTextToClipboard(text: string) {
  let textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  return new Promise<boolean>((resolve, reject) => {
    try {
      let successful = document.execCommand("copy");
      resolve(successful);
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}

export const copyText = (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  return navigator.clipboard.writeText(text).then(() => true);
};

// 节流
export function useThrottle(fn: any, interval = 1000) {
  const lastExecRef = ref(Date.now());

  return function (...args: any) {
    const now = Date.now();
    if (now - lastExecRef.value >= interval) {
      lastExecRef.value = now;
      fn(...args);
    }
  };
}

// 防抖
export function useDebounce(fn: any, delay = 1000) {
  let timeoutId: any = null;

  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
/**
 * 支持解析出中文
 * @uri base64编码
 */
export const urlSafeBase64Decode = (uri: string) => {
  // 将URL安全的Base64字符替换为标准Base64字符
  let str = uri;
  if (uri.indexOf("-") > -1 || uri.indexOf("_") > -1) {
    str = uri.replace(/-/g, "+").replace(/_/g, "/");
  }
  const pad = str.length % 4;
  if (pad) {
    str += new Array(4 - pad).fill("=").join("");
  }
  // 使用window.atob()解码字符串

  const binaryStr = window.atob(str);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  // 使用TextDecoder将二进制数据解码为UTF-8字符串
  const decoder = new TextDecoder("utf-8");
  const utf8Str = decoder.decode(bytes);

  return utf8Str;
};
// 判断手机是否正确
export const isMobile = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone);
};
// 判断邮箱格式是否正确
export const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
