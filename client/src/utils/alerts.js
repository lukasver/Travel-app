import Swal from 'sweetalert2';

export const fetchingDataError = (t) =>
  Swal.fire({
    icon: 'error',
    title: t('Alerts.fetchingDataError.title'),
    text: t('Alerts.fetchingDataError.text'),
    footer: t('Alerts.fetchingDataError.footer'),
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup',
    },
  });

export const challengeEnding = (t) =>
  Swal.fire({
    icon: 'success',
    title: t('Alerts.challengeEnding.title'),
    text: t('Alerts.challengeEnding.text'),
    showConfirmButton: true,
    confirmButtonText: t('Common.thanks'),
  });

export const finalBookingConfirmation = (t) =>
  Swal.mixin({
    title: t('Alerts.finalBookingConfirmation.title'),
    text: t('Alerts.finalBookingConfirmation.text'),
    input: 'email',
    validationMessage: t('Alerts.finalBookingConfirmation.validationMessage'),
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: t('Common.send'),
    cancelButtonText: t('Common.cancel'),
    cancelButtonColor: '#000000',
    confirmButtonColor: '#25a18e',
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup',
    },
  }).fire();

export const bookingConfirmAlert = (t) =>
  Swal.mixin({
    title: t('Alerts.bookingConfirmAlert.title'),
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: t('Common.yes'),
    denyButtonText: `No`,
    cancelButtonText: t('Common.exit'),
    cancelButtonColor: '#000000',
    confirmButtonColor: '#25a18e',
    denyButtonColor: '#61d3be',
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup',
    },
  }).fire();

export const bookFlightSeats = (maxSeats, t) =>
  Swal.mixin({
    title: t('Alerts.bookFlightSeats.title'),
    text: t('Alerts.bookFlightSeats.text'),
    input: 'select',
    inputOptions: getSeatOptions(maxSeats || 5),
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: t('Alerts.bookFlightSeats.confirmSeats'),
    cancelButtonText: t('Common.exit'),
    confirmButtonColor: '#25a18e',
    cancelButtonColor: '#000000',
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup',
      actions: 'my-swal-actions',
      confirmButton: 'my-swal-confirm-button',
    },
  }).fire();

function getSeatOptions(num) {
  let obj = {};
  for (const opt of Array(num + 1).keys()) {
    if (opt > 10) break;
    if (opt !== 0) {
      obj[opt] = opt;
    }
  }
  return obj;
}

export const noMatchingOriginToast = (t) =>
  Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  }).fire({
    icon: 'info',
    title: t('Alerts.noMatchingOriginToast.title'),
    text: t('Alerts.noMatchingOriginToast.text'),
  });

export const noReturnFlightsAlert = (t) =>
  Swal.fire({
    title: t('Alerts.noReturnFlightsAlert.title'),
    text: t('Alerts.noReturnFlightsAlert.text'),
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: t('Alerts.noReturnFlightsAlert.confirmButtonText'),
    denyButtonText: t('Alerts.noReturnFlightsAlert.denyButtonText'),
    cancelButtonText: t("Common.exit"),
    cancelButtonColor: '#000000',
    confirmButtonColor: '#25a18e',
    denyButtonColor: '#61d3be',
    customClass: {
      container: 'my-swal',
      popup: 'my-swal-popup',
    },
  });
