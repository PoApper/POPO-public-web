import moment from "moment";
import {Label} from "semantic-ui-react";
import React from "react";

export function convertDate(numberedDate) {
  const year = parseInt(numberedDate / 10000);
  const month = parseInt((numberedDate % 10000) / 100);
  const day = numberedDate % 100;
  const date = new Date().setFullYear(year, month - 1, day);
  return moment(date).format("YYYY.MM.DD")
}

export function convertTime(numberTime) {
  const hour = parseInt(numberTime / 100);
  const minute = numberTime % 100;
  const time = new Date().setHours(hour, minute)
  return moment(time).format('HH:mm');
}

export function convertStatus(status) {
  let labelColor = 'black';
  if (status === '통과') {
    labelColor = 'green';
  } else if (status === '거절') {
    labelColor = 'red';
  }
  return <Label circular color={labelColor} empty/>
}

export function convertDateTime(numberedDate, numberTime) {
  const year = parseInt(numberedDate / 10000);
  const month = parseInt((numberedDate % 10000) / 100);
  const day = numberedDate % 100;
  const date = new Date().setFullYear(year, month - 1, day);
  const hour = parseInt(numberTime / 100);
  const minute = numberTime % 100;
  return new Date(date).setHours(hour, minute);
}