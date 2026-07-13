/* Prayer Times — Public Visitor Widget with Active Capsule + Aladhan API */
(function () {
  'use strict';

  var MAKKAH = { cityAr: '\u0645\u0643\u0629 \u0627\u0644\u0645\u0643\u0631\u0645\u0629', cityEn: 'Makkah', countryCode: 'SA', lat: 21.4225, lng: 39.8262 };

  var CFG = { methods: { UQ: { fajr: 18.5, isha: 90 }, MWL: { fajr: 18, isha: 17 } } };
  var API_KEY_MAP = { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' };

  function dtr(d) { return d * Math.PI / 180; }
  function rtd(r) { return r * 180 / Math.PI; }
  function sunPos(jd) {
    var T = (jd - 2451545) / 36525;
    var M = 357.5291 + 35999.05029 * T;
    var L = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    var e = 0.016708634 - 0.000042037 * T;
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(dtr(M)) + (0.019993 - 0.000101 * T) * Math.sin(dtr(2 * M)) + 0.000289 * Math.sin(dtr(3 * M));
    var sunLon = L + C;
    var eps = 23.439291 - 0.0130042 * T;
    return { declination: rtd(Math.asin(Math.sin(dtr(eps)) * Math.sin(dtr(sunLon)))), equation: rtd(0.0057183 - 0.0001272 * Math.cos(dtr(M)) - 0.0001223 * Math.cos(dtr(2 * L)) + 0.0000724 * Math.cos(dtr(L))) };
  }
  function julianDate(year, month, day) {
    if (month <= 2) { year--; month += 12; }
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + (2 - Math.floor(year / 100) + Math.floor(Math.floor(year / 100) / 4)) - 1524.5;
  }
  function hourAngle(lat, decl, angle) { return rtd(Math.acos((Math.sin(dtr(angle)) - Math.sin(dtr(lat)) * Math.sin(dtr(decl))) / (Math.cos(dtr(lat)) * Math.cos(dtr(decl))))); }
  function calcTimes(date, lat, lng, tzOffset, method) {
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    var jd = julianDate(year, month, day);
    var sun = sunPos(jd);
    var dhuhr = 12 + (tzOffset * 60 - lng * 4) / 60 - sun.equation / 60;
    var sHA = hourAngle(lat, sun.declination, -0.8333);
    var fHA = hourAngle(lat, sun.declination, -method.fajr);
    var sunrise = dhuhr - sHA / 15;
    var fajr = dhuhr - fHA / 15;
    var maghrib = dhuhr + sHA / 15;
    var isha = method.isha >= 60 ? maghrib + method.isha / 60 : dhuhr + hourAngle(lat, sun.declination, -method.isha) / 15;
    var asrAlt = rtd(Math.atan(1 + Math.tan(Math.abs(dtr(lat) - dtr(sun.declination)))));
    var asr = dhuhr + rtd(Math.acos((Math.sin(dtr(90 - asrAlt)) - Math.sin(dtr(lat)) * Math.sin(dtr(sun.declination))) / (Math.cos(dtr(lat)) * Math.cos(dtr(sun.declination))))) / 15;
    function m(d) { var h = Math.floor(d); return h * 60 + Math.round((d - h) * 60); }
    return { fajr: m(fajr), sunrise: m(sunrise), dhuhr: m(dhuhr), asr: m(asr), maghrib: m(maghrib), isha: m(isha) };
  }
  function compute(lat, lng, methodId) {
    var method = CFG.methods[methodId] || CFG.methods.MWL;
    var now = new Date();
    var tz = -now.getTimezoneOffset() / 60;
    var today = calcTimes(now, lat, lng, tz, method);
    var tmw = new Date(now); tmw.setDate(tmw.getDate() + 1);
    return { today: today, tomorrow: calcTimes(tmw, lat, lng, tz, method) };
  }
  function getMethod(cc) { return cc === 'SA' ? 'UQ' : 'MWL'; }

  var ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  var NAMES = { ar: {
    fajr: '\u0627\u0644\u0641\u062C\u0631',
    sunrise: '\u0627\u0644\u0634\u0631\u0648\u0642',
    dhuhr: '\u0627\u0644\u0638\u0647\u0631',
    asr: '\u0627\u0644\u0639\u0635\u0631',
    maghrib: '\u0627\u0644\u0645\u063A\u0631\u0628',
    isha: '\u0627\u0644\u0639\u0634\u0627\u0621'
  }, en: {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha'
  } };

  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function fmt(m) { var h = Math.floor(m / 60); var mn = m % 60; return (h < 10 ? '0' : '') + h + ':' + (mn < 10 ? '0' : '') + mn; }
  function fmtCountdown(mins) { if (mins <= 0) return '00:00'; var h = Math.floor(mins / 60); var mn = Math.floor(mins % 60); return (h < 10 ? '0' : '') + h + ':' + (mn < 10 ? '0' : '') + mn; }

  var el = {}, gpsCityLabel = '', gpsCountryCode = '', tickTimer = null, fullTimer = null, todayData = null, tomorrowData = null;
  var SESSION_KEY = 'pr-session';
  var gpsDone = false;

  var TXT = {
    capsuleActive: { ar: '\u0645\u0648\u0627\u0642\u064A\u062A \u0645\u0648\u0642\u0639\u0643 \u0627\u0644\u062D\u0627\u0644\u064A', en: 'Your location times' },
    capsuleLocating: { ar: '\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u062F\u064A\u062F...', en: 'Locating...' },
    labelGetting: { ar: '\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u0637\u0642\u0629...', en: 'Getting area name...' },
    labelFallback: { ar: '\u0645\u0648\u0642\u0639\u0643 \u0627\u0644\u062D\u0627\u0644\u064A', en: 'Your location' }
  };

  function getEls() {
    el.ribbon = document.getElementById('prayer-ribbon');
    if (!el.ribbon) return false;
    el.city = el.ribbon.querySelector('[data-pr-city]');
    el.capsule = el.ribbon.querySelector('[data-pr-gps]');
    el.next = el.ribbon.querySelector('[data-pr-next]');
    el.countdown = el.ribbon.querySelector('[data-pr-countdown]');
    el.pills = el.ribbon.querySelector('[data-pr-pills]');
    return true;
  }

  function getNextPrayer(times) {
    var nowMin = new Date().getHours() * 60 + new Date().getMinutes() + new Date().getSeconds() / 60;
    for (var i = 0; i < ORDER.length; i++) { if (times[ORDER[i]] > nowMin) return { name: ORDER[i], time: times[ORDER[i]], tomorrow: false }; }
    return { name: 'fajr', time: times.fajr, tomorrow: true };
  }
  function getNextPrayerNoSunrise(times) {
    var nowMin = new Date().getHours() * 60 + new Date().getMinutes() + new Date().getSeconds() / 60;
    for (var i = 0; i < ORDER.length; i++) {
      if (ORDER[i] === 'sunrise') continue;
      if (times[ORDER[i]] > nowMin) return { name: ORDER[i], time: times[ORDER[i]], tomorrow: false };
    }
    return { name: 'fajr', time: times.fajr, tomorrow: true };
  }

  function render() {
    if (!todayData || !el.pills) return;
    var now = new Date();
    var nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    var np = getNextPrayer(todayData);
    var npBadge = getNextPrayerNoSunrise(todayData);
    var L = lang();
    var n = L === 'ar' ? NAMES.ar : NAMES.en;

    var html = '';
    var hasCurrent = false;
    for (var i = 0; i < ORDER.length; i++) {
      var p = ORDER[i];
      var cls = 'pr-pill';
      if (p === 'sunrise') {
        cls += ' pr-sunrise';
        if (np.name === 'sunrise' && !np.tomorrow) {
          cls += ' pr-next';
          var diff = todayData[p] - nowMin;
          if (diff >= 0 && diff <= 90) cls += ' pr-urgent';
          hasCurrent = true;
        }
      }
      else if (np.name === p && !np.tomorrow) {
        cls += ' pr-next';
        var diff = todayData[p] - nowMin;
        if (diff >= 0 && diff <= 90) cls += ' pr-urgent';
        hasCurrent = true;
      }
      else if (!hasCurrent && !np.tomorrow) cls += ' pr-past';
      else cls += ' pr-upcoming';
      var marker = (np.name === p && !np.tomorrow && todayData[p] - nowMin >= 0 && todayData[p] - nowMin <= 90) ? '\u25C2 ' : '';
      html += '<span class="' + cls + '"><span class="pr-name">' + marker + n[p] + '</span><span class="pr-time">' + fmt(todayData[p]) + '</span></span>';
    }
    el.pills.innerHTML = html;

    if (npBadge && !npBadge.tomorrow) {
      el.next.innerHTML = '<span class="pr-next-label">' + (L === 'ar' ? '\u0627\u0644\u0635\u0644\u0627\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:' : 'Next:') + '</span> <span class="pr-next-name">' + n[npBadge.name] + '</span> <span class="pr-next-time">' + fmt(todayData[npBadge.name]) + '</span>';
      var diff = todayData[npBadge.name] - nowMin; if (diff < 0) diff = 0;
      el.countdown.innerHTML = '<span class="pr-remaining-label">' + (L === 'ar' ? '\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A: ' : 'Remaining: ') + '</span><span class="pr-remaining-value">' + fmtCountdown(diff) + '</span>';
    } else {
      var fTime = todayData.fajr;
      el.next.innerHTML = '<span class="pr-next-label">' + (L === 'ar' ? '\u0627\u0644\u0635\u0644\u0627\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:' : 'Next:') + '</span> <span class="pr-next-name">' + n.fajr + '</span> <span class="pr-next-time">' + fmt(fTime) + '</span>';
      el.countdown.innerHTML = '<span class="pr-remaining-label">' + (L === 'ar' ? '\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A: ' : 'Remaining: ') + '</span><span class="pr-remaining-value">' + fmtCountdown(fTime + 1440 - nowMin) + '</span>';
    }
  }

  function setPrayerData(today, tomorrow) {
    todayData = today; tomorrowData = tomorrow;
    render();
    if (tickTimer) clearInterval(tickTimer);
    tickTimer = setInterval(render, 5000);
    if (fullTimer) clearInterval(fullTimer);
    fullTimer = setInterval(function () { var n = new Date(); if (n.getHours() === 0 && n.getMinutes() === 0) location.reload(); }, 60000);
  }

  function setCityLabel(label) {
    if (el.city) { el.city.textContent = label; el.city.setAttribute('title', label); }
  }

  function setCapsuleLabel(label) {
    if (el.capsule) { el.capsule.textContent = label; el.capsule.setAttribute('title', label); }
  }

  function dimCapsule() {
    gpsDone = true;
    if (el.capsule) { el.capsule.classList.add('pr-gps-done'); el.capsule.removeAttribute('role'); el.capsule.removeAttribute('tabindex'); }
  }

  function saveSession(lat, lon, label, cc) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ lat: lat, lon: lon, label: label || '', countryCode: cc || '', ts: Date.now() })); } catch (e) {}
  }

  function fetchFromAPI(lat, lng, cb) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.onload = function () {
      try {
        var d = JSON.parse(xhr.responseText);
        if (d && d.data && d.data.timings) {
          var t = d.data.timings;
          var times = {};
          for (var k in API_KEY_MAP) {
            var parts = (t[API_KEY_MAP[k]] || '00:00').split(':');
            times[k] = parseInt(parts[0]) * 60 + parseInt(parts[1]);
          }
          cb(null, times);
          return;
        }
      } catch (e) {}
      cb('parse');
    };
    xhr.onerror = function () { cb('network'); };
    xhr.ontimeout = function () { cb('timeout'); };
    xhr.open('GET', 'https://api.aladhan.com/v1/timings?latitude=' + lat + '&longitude=' + lng + '&method=4', true);
    xhr.send();
  }

  function applyTimes(lat, lng, todayTimes, cc) {
    var methodId = getMethod(cc || '');
    var fallback = compute(lat, lng, methodId);
    var today = todayTimes || fallback.today;
    var tmw = fallback.tomorrow;
    setPrayerData(today, tmw);
  }

  function reverseGeocode(lat, lng, cb) {
    var L = lang();
    var url = 'https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=' + lat + '&lon=' + lng + '&zoom=10&addressdetails=1&accept-language=' + (L === 'ar' ? 'ar' : 'en') + '&email=am.farouq25@gmail.com';
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.onload = function () {
      try {
        var d = JSON.parse(xhr.responseText);
        var label = '', cc = '';
        if (d && d.type === 'FeatureCollection' && d.features && d.features[0] && d.features[0].properties && d.features[0].properties.geocoding) {
          var g = d.features[0].properties.geocoding;
          var mp = g.city || g.town || g.village || g.locality || g.district || g.county || g.state || '';
          cc = (g.country_code || '').toUpperCase();
          if (mp) { label = mp; }
          else if (g.country) { label = g.country; }
        }
        if (!label && d && d.address) {
          var a = d.address;
          var mp = a.city || a.town || a.village || a.municipality || a.city_district || a.suburb || a.neighbourhood || a.county || a.state_district || a.state || a.region || '';
          if (mp) { label = mp; }
          else if (a.country) { label = a.country; }
          if (!cc) cc = (a.country_code || '').toUpperCase();
        }
        cb(label, cc);
        return;
      } catch (e) {}
      cb('');
    };
    xhr.onerror = function () { cb(''); };
    xhr.ontimeout = function () { cb(''); };
    xhr.open('GET', url, true);
    xhr.setRequestHeader('User-Agent', 'MyCVWebSite/1.0');
    xhr.send();
  }

  function handleGPS(lat, lng) {
    var L = lang();
    setCityLabel(L === 'ar' ? TXT.labelGetting.ar : TXT.labelGetting.en);
    applyTimes(lat, lng, null, '');
    reverseGeocode(lat, lng, function (label, cc) {
      var finalLabel = label || (L === 'ar' ? TXT.labelFallback.ar : TXT.labelFallback.en);
      setCityLabel(finalLabel);
      gpsCityLabel = finalLabel;
      gpsCountryCode = cc;
      saveSession(lat, lng, finalLabel, cc);
      fetchFromAPI(lat, lng, function (err, apiTimes) {
        if (!err && apiTimes) {
          applyTimes(lat, lng, apiTimes, cc);
        } else {
          applyTimes(lat, lng, null, cc);
        }
        dimCapsule();
      });
    });
  }

  function onCapsuleClick() {
    if (gpsDone || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (pos) {
      handleGPS(pos.coords.latitude, pos.coords.longitude);
    }, function () {
      dimCapsule();
      saveSession(MAKKAH.lat, MAKKAH.lng, '', 'SA');
    }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 86400000 });
  }

  function init() {
    if (!getEls()) return;
    var L = lang();
    try {
      var saved = JSON.parse(sessionStorage.getItem(SESSION_KEY));
      if (saved && saved.lat) {
        if (saved.label) {
          setCityLabel(saved.label);
          gpsCityLabel = saved.label;
          gpsCountryCode = saved.countryCode || '';
        }
        dimCapsule();
        applyTimes(saved.lat, saved.lon || saved.lat, null, saved.countryCode);
        return;
      }
    } catch (e) {}

    if (el.capsule) {
      el.capsule.addEventListener('click', onCapsuleClick);
    }
    setCityLabel(L === 'ar' ? MAKKAH.cityAr : MAKKAH.cityEn);
    setCapsuleLabel('\u0645\u0648\u0627\u0642\u064A\u062A \u0645\u0648\u0642\u0639\u0643 \u0627\u0644\u062D\u0627\u0644\u064A');
    applyTimes(MAKKAH.lat, MAKKAH.lng, null, MAKKAH.countryCode);
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }

  document.addEventListener('cv-lang-change', function () {
    if (!el.city) getEls();
    var L = lang();
    if (gpsDone && gpsCityLabel) {
      setCityLabel(gpsCityLabel);
    } else {
      setCityLabel(L === 'ar' ? MAKKAH.cityAr : MAKKAH.cityEn);
    }
    render();
  });
})();
