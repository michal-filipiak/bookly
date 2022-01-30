export default function validateDate(date) {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    const regExp = new RegExp(pattern);

    return regExp.test(date) || date === '';
}