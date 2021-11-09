import { Alert, Platform } from "react-native";
import Moment from 'moment';
Moment.locale('en')
import ImagePicker from 'react-native-image-crop-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage"
import CameraRoll from "@react-native-community/cameraroll";

export const successMessage = (title, body, duration) => Toast.show({
    type: 'success',
    text1: title,
    text2: body,
    visibilityTime: duration,
    autoHide: true
})

export const errorMessage = (title, body, duration) => Toast.show({
    type: 'error',
    text1: title,
    text2: body,
    visibilityTime: duration,
    autoHide: true
})

export const warningMessage = (title, body, duration) => Toast.show({
    type: 'info',
    text1: title,
    text2: body,
    visibilityTime: duration,
    autoHide: true
})

export const getAsyncStorgaeValue = async key => {
    return await AsyncStorage.getItem(key)
}

export const setAsyncStorageValue = async (key, value) => {
    return await AsyncStorage.setItem(key.toString(), value.toString())
}


export const chooseImage = () => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            "Select Image",
            '',
            [
                {
                    text: 'Camera', onPress: () => {
                        ImagePicker.openCamera({
                            quality: 1.0,
                            width: wp(80),
                            height: wp(80),
                            cropping: true,
                            freeStyleCropEnabled: true,
                            cropperCircleOverlay: true,
                        }).then(image => {
                            resolve(image)
                        });
                    }
                },
                {
                    text: 'Gallery', onPress: () => {
                        ImagePicker.openPicker({
                            quality: 0.5,
                            maxWidth: wp(80),
                            maxHeight: wp(80),
                            cropping: true,
                            freeStyleCropEnabled: true,
                            cropperCircleOverlay: true,
                        }).then(image => {
                            resolve(image)
                        });
                    }
                },
                {
                    text: 'Cancel', onPress: () => { reject() }
                }],
            { cancelable: false }
        )
    })
}

export function navigationFunction(props, route, params) {
    let { navigation } = props
    let { navigate } = navigation
    if (params) {
        navigate(route, params)
    } else {
        navigate(route)
    }

}

export function sorting(item1, item2, order) {
    if (order === 'ascending') {
        if (item1 > item2) {
            return 1
        }
        else if (item1 < item2) {
            return -1
        }
        else {
            return 0
        }
    }
    else if (order === 'descending') {
        if (item1 < item2) {
            return 1
        }
        else if (item1 > item2) {
            return -1
        }
        else {
            return 0
        }
    }
}


export function filterContacts(item) {
    const noDuplicateNumber = item.phoneNumbers.filter((item, index, array) => {
        var returnItem;
        for (let i = 0; i < array.length; i++) {

            if (omitSpaces(item.number) === omitSpaces(array[i].number) && i !== index) {

                returnItem = undefined
                break;
            }
            else if (omitSpaces(item.number) === omitSpaces(array[i].number)) {

                returnItem = item
                break;
            }
            else {
                returnItem = item
            }
        }
        return returnItem
    })
    item.phoneNumbers = noDuplicateNumber
    return item
}

export const MeetingDurationArray = [
    { label: '15 Minutes', value: '15' },
    { label: '30 Minutes', value: '30' },
    { label: '45 Minutes', value: '45' }, ,
]





export function email_validate(text) {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}
export function password_validate(text) {
    if (text != "" && text.length >= 6) {
        return true;
    }
    else {
        return false;
    }
}



export function secondToHours(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 10 ? h : h < 10 ? `0${h}` : '00';
    var mDisplay = m > 10 ? m : m < 10 ? `0${m}` : '00';
    var sDisplay = s > 10 ? s : s < 10 ? `0${s}` : '00';
    return hDisplay + ':' + mDisplay + ':' + sDisplay;
}

function validPhonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.value.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


export async function changeNavBarColor(color) {
    try {
        const response = await (color, true);
        console.log(response)// {success: true}
    } catch (e) {
        console.log(e)// {success: false}
    }

};

export function generateRandomString(length = 6) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function convertTimStampToLocal(timeStamp, fullDate) {

    const msg_date = new Date(parseInt(timeStamp))
    const date = msg_date.toLocaleDateString("en-US")
    const time_12hr = msg_date.toLocaleTimeString("en-US")

    const msg_hours = msg_date.getHours() < 10 ? "0" + msg_date.getHours() : msg_date.getHours()
    const msg_minutes = msg_date.getMinutes() < 10 ? "0" + msg_date.getMinutes() : msg_date.getMinutes()
    var msg_seconds = msg_date.getSeconds() < 10 ? "0" + msg_date.getSeconds() : msg_date.getSeconds();

    const time = msg_hours + ":" + msg_minutes;

    if (fullDate) {

        let dateTime = date + " " + time
        return dateTime
    }
    else {

        const currentDate = new Date().getDate()
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        const msgDate = msg_date.getDate()
        const msgMonth = msg_date.getMonth()
        const msgYear = msg_date.getFullYear()

        // console.log('---date_Time-else---', (currentMonth === msgMonth && currentYear === msgYear))

        if (currentMonth === msgMonth && currentYear === msgYear) {

            if (currentDate === msgDate)
                return time
            else if (currentDate - msgDate == 1)
                return 'Yesterday'
            else
                return date
        }
        else {
            return date
        }

    }
}
function getTimeStamp(input) {
    var parts = input.trim().split(' ');
    var date = parts[0].split('-');
    var time = (parts[1] ? parts[1] : '00:00:00').split(':');

    // NOTE:: Month: 0 = January - 11 = December.
    var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
    return d.getTime();
}

export function convertSectionTimStampToLocal(timeStamp12, fullDate) {
    var timeStamp = getTimeStamp(timeStamp12);

    const msg_date = new Date(parseInt(timeStamp))
    const date = msg_date.toLocaleDateString("en-US")

    const time_12hr = msg_date.toLocaleTimeString("en-US")

    const msg_hours = msg_date.getHours() < 10 ? "0" + msg_date.getHours() : msg_date.getHours()
    const msg_minutes = msg_date.getMinutes() < 10 ? "0" + msg_date.getMinutes() : msg_date.getMinutes()
    var msg_seconds = msg_date.getSeconds() < 10 ? "0" + msg_date.getSeconds() : msg_date.getSeconds();

    const time = msg_hours + ":" + msg_minutes;

    if (fullDate) {

        let dateTime = date + " " + time
        return dateTime
    }
    else {

        const currentDate = new Date().getDate()
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        const msgDate = msg_date.getDate()
        const msgMonth = msg_date.getMonth()
        const msgYear = msg_date.getFullYear()
        // console.log('formatted---->', msgDate, msgMonth, msgYear)
        // console.log('---date_Time-else---', (currentMonth === msgMonth && currentYear === msgYear))
        var formattedDate = '';
        if (msgMonth === 0) {
            formattedDate = `${msgDate} January ${msgYear}`
        } else if (msgMonth === 1) {
            formattedDate = `${msgDate} February ${msgYear}`
        } else if (msgMonth === 2) {
            formattedDate = `${msgDate} March ${msgYear}`
        } else if (msgMonth === 3) {
            formattedDate = `${msgDate} April ${msgYear}`
        } else if (msgMonth === 4) {
            formattedDate = `${msgDate} May ${msgYear}`
        } else if (msgMonth === 5) {
            formattedDate = `${msgDate} June ${msgYear}`
        } else if (msgMonth === 6) {
            formattedDate = `${msgDate} July ${msgYear}`
        } else if (msgMonth === 7) {
            formattedDate = `${msgDate} August ${msgYear}`
        } else if (msgMonth === 8) {
            formattedDate = `${msgDate} September ${msgYear}`
        } else if (msgMonth === 9) {
            formattedDate = `${msgDate} October ${msgYear}`
        } else if (msgMonth === 10) {
            formattedDate = `${msgDate} November ${msgYear}`
        } else {
            formattedDate = `${msgDate} December ${msgYear}`
        }
        if (currentMonth === msgMonth && currentYear === msgYear) {

            if (currentDate === msgDate)
                // return time
                return { istoday: true, header: 'Today', date: time, orignalDate: timeStamp }
            else if (currentDate - msgDate == 1)
                return { istoday: false, header: 'Yesterday', date: 'Yesterday', orignalDate: timeStamp }
            // return 'Yesterday'
            else
                return { istoday: false, header: formattedDate, date: date, orignalDate: timeStamp }
            // return date + ' ' + time
        }
        else {
            // return date + ' '
            return { istoday: false, header: formattedDate, date: date, orignalDate: timeStamp }
        }

    }
}


export function getTimeFromDate(timeStamp) {
    const msg_date = new Date(parseInt(timeStamp))
    const msg_hours = msg_date.getHours() < 10 ? "0" + msg_date.getHours() : msg_date.getHours()
    const msg_minutes = msg_date.getMinutes() < 10 ? "0" + msg_date.getMinutes() : msg_date.getMinutes()
    const time = msg_hours + ":" + msg_minutes;
    return time
}

export const ImagePickerAlert = (title, buttonTitle1, buttonTitle2, message) => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: buttonTitle1, onPress: () => resolve(buttonTitle1)
                },
                {
                    text: buttonTitle2, onPress: () => resolve(buttonTitle2)
                },
                {
                    text: 'Cancel', onPress: () => resolve('cancel')
                }],
            { cancelable: false }
        )
    })

}

export let CountryPrefixes = [
    { 'value': '44', 'label': 'UK (+44)' },
    { 'value': '1', 'label': 'USA (+1)' },
    { 'value': '213', 'label': 'Algeria (+213)' },
    { 'value': '376', 'label': 'Andorra (+376)' },
    { 'value': '244', 'label': 'Angola (+244)' },
    { 'value': '1264', 'label': 'Anguilla (+1264)' },
    { 'value': '1268', 'label': 'Antigua & Barbuda (+1268)' },
    { 'value': '54', 'label': 'Argentina (+54)' },
    { 'value': '374', 'label': 'Armenia (+374)' },
    { 'value': '297', 'label': 'Aruba (+297)' },
    { 'value': '61', 'label': 'Australia (+61)' },
    { 'value': '43', 'label': 'Austria (+43)' },
    { 'value': '994', 'label': 'Azerbaijan (+994)' },
    { 'value': '1242', 'label': 'Bahamas (+1242)' },
    { 'value': '973', 'label': 'Bahrain (+973)' },
    { 'value': '880', 'label': 'Bangladesh (+880)' },
    { 'value': '1246', 'label': 'Barbados (+1246)' },
    { 'value': '375', 'label': 'Belarus (+375)' },
    { 'value': '32', 'label': 'Belgium (+32)' },
    { 'value': '501', 'label': 'Belize (+501)' },
    { 'value': '229', 'label': 'Benin (+229)' },
    { 'value': '1441', 'label': 'Bermuda (+1441)' },
    { 'value': '975', 'label': 'Bhutan (+975)' },
    { 'value': '591', 'label': 'Bolivia (+591)' },
    { 'value': '387', 'label': 'Bosnia Herzegovina (+387)' },
    { 'value': '267', 'label': 'Botswana (+267)' },
    { 'value': '55', 'label': 'Brazil (+55)' },
    { 'value': '673', 'label': 'Brunei (+673)' },
    { 'value': '359', 'label': 'Bulgaria (+359)' },
    { 'value': '226', 'label': 'Burkina Faso (+226)' },
    { 'value': '257', 'label': 'Burundi (+257)' },
    { 'value': '855', 'label': 'Cambodia (+855)' },
    { 'value': '237', 'label': 'Cameroon (+237)' },
    { 'value': '1', 'label': 'Canada (+1)' },
    { 'value': '238', 'label': 'Cape Verde Islands (+238)' },
    { 'value': '1345', 'label': 'Cayman Islands (+1345)' },
    { 'value': '236', 'label': 'Central African Republic (+236)' },
    { 'value': '56', 'label': 'Chile (+56)' },
    { 'value': '86', 'label': 'China (+86)' },
    { 'value': '57', 'label': 'Colombia (+57)' },
    { 'value': '269', 'label': 'Comoros (+269)' },
    { 'value': '242', 'label': 'Congo (+242)' },
    { 'value': '682', 'label': 'Cook Islands (+682)' },
    { 'value': '506', 'label': 'Costa Rica (+506)' },
    { 'value': '385', 'label': 'Croatia (+385)' },
    { 'value': '53', 'label': 'Cuba (+53)' },
    { 'value': '90392', 'label': 'Cyprus North (+90392)' },
    { 'value': '357', 'label': 'Cyprus South (+357)' },
    { 'value': '42', 'label': 'Czech Republic (+42)' },
    { 'value': '45', 'label': 'Denmark (+45)' },
    { 'value': '253', 'label': 'Djibouti (+253)' },
    { 'value': '1809', 'label': 'Dominica (+1809)' },
    { 'value': '1809', 'label': 'Dominican Republic (+1809)' },
    { 'value': '593', 'label': 'Ecuador (+593)' },
    { 'value': '20', 'label': 'Egypt (+20)' },
    { 'value': '503', 'label': 'El Salvador (+503)' },
    { 'value': '240', 'label': 'Equatorial Guinea (+240)' },
    { 'value': '291', 'label': 'Eritrea (+291)' },
    { 'value': '372', 'label': 'Estonia (+372)' },
    { 'value': '251', 'label': 'Ethiopia (+251)' },
    { 'value': '500', 'label': 'Falkland Islands (+500)' },
    { 'value': '298', 'label': 'Faroe Islands (+298)' },
    { 'value': '679', 'label': 'Fiji (+679)' },
    { 'value': '358', 'label': 'Finland (+358)' },
    { 'value': '33', 'label': 'France (+33)' },
    { 'value': '594', 'label': 'French Guiana (+594)' },
    { 'value': '689', 'label': 'French Polynesia (+689)' },
    { 'value': '241', 'label': 'Gabon (+241)' },
    { 'value': '220', 'label': 'Gambia (+220)' },
    { 'value': '7880', 'label': 'Georgia (+7880)' },
    { 'value': '49', 'label': 'Germany (+49)' },
    { 'value': '233', 'label': 'Ghana (+233)' },
    { 'value': '350', 'label': 'Gibraltar (+350)' },
    { 'value': '30', 'label': 'Greece (+30)' },
    { 'value': '299', 'label': 'Greenland (+299)' },
    { 'value': '1473', 'label': 'Grenada (+1473)' },
    { 'value': '590', 'label': 'Guadeloupe (+590)' },
    { 'value': '671', 'label': 'Guam (+671)' },
    { 'value': '502', 'label': 'Guatemala (+502)' },
    { 'value': '224', 'label': 'Guinea (+224)' },
    { 'value': '245', 'label': 'Guinea - Bissau (+245)' },
    { 'value': '592', 'label': 'Guyana (+592)' },
    { 'value': '509', 'label': 'Haiti (+509)' },
    { 'value': '504', 'label': 'Honduras (+504)' },
    { 'value': '852', 'label': 'Hong Kong (+852)' },
    { 'value': '36', 'label': 'Hungary (+36)' },
    { 'value': '354', 'label': 'Iceland (+354)' },
    { 'value': '91', 'label': 'India (+91)' },
    { 'value': '62', 'label': 'Indonesia (+62)' },
    { 'value': '98', 'label': 'Iran (+98)' },
    { 'value': '964', 'label': 'Iraq (+964)' },
    { 'value': '353', 'label': 'Ireland (+353)' },
    { 'value': '972', 'label': 'Israel (+972)' },
    { 'value': '39', 'label': 'Italy (+39)' },
    { 'value': '1876', 'label': 'Jamaica (+1876)' },
    { 'value': '81', 'label': 'Japan (+81)' },
    { 'value': '962', 'label': 'Jordan (+962)' },
    { 'value': '7', 'label': 'Kazakhstan (+7)' },
    { 'value': '254', 'label': 'Kenya (+254)' },
    { 'value': '686', 'label': 'Kiribati (+686)' },
    { 'value': '850', 'label': 'Korea North (+850)' },
    { 'value': '82', 'label': 'Korea South (+82)' },
    { 'value': '965', 'label': 'Kuwait (+965)' },
    { 'value': '996', 'label': 'Kyrgyzstan (+996)' },
    { 'value': '856', 'label': 'Laos (+856)' },
    { 'value': '371', 'label': 'Latvia (+371)' },
    { 'value': '961', 'label': 'Lebanon (+961)' },
    { 'value': '266', 'label': 'Lesotho (+266)' },
    { 'value': '231', 'label': 'Liberia (+231)' },
    { 'value': '218', 'label': 'Libya (+218)' },
    { 'value': '417', 'label': 'Liechtenstein (+417)' },
    { 'value': '370', 'label': 'Lithuania (+370)' },
    { 'value': '352', 'label': 'Luxembourg (+352)' },
    { 'value': '853', 'label': 'Macao (+853)' },
    { 'value': '389', 'label': 'Macedonia (+389)' },
    { 'value': '261', 'label': 'Madagascar (+261)' },
    { 'value': '265', 'label': 'Malawi (+265)' },
    { 'value': '60', 'label': 'Malaysia (+60)' },
    { 'value': '960', 'label': 'Maldives (+960)' },
    { 'value': '223', 'label': 'Mali (+223)' },
    { 'value': '356', 'label': 'Malta (+356)' },
    { 'value': '692', 'label': 'Marshall Islands (+692)' },
    { 'value': '596', 'label': 'Martinique (+596)' },
    { 'value': '222', 'label': 'Mauritania (+222)' },
    { 'value': '269', 'label': 'Mayotte (+269)' },
    { 'value': '52', 'label': 'Mexico (+52)' },
    { 'value': '691', 'label': 'Micronesia (+691)' },
    { 'value': '373', 'label': 'Moldova (+373)' },
    { 'value': '377', 'label': 'Monaco (+377)' },
    { 'value': '976', 'label': 'Mongolia (+976)' },
    { 'value': '1664', 'label': 'Montserrat (+1664)' },
    { 'value': '212', 'label': 'Morocco (+212)' },
    { 'value': '258', 'label': 'Mozambique (+258)' },
    { 'value': '95', 'label': 'Myanmar (+95)' },
    { 'value': '264', 'label': 'Namibia (+264)' },
    { 'value': '674', 'label': 'Nepal (+977)' },
    { 'value': '31', 'label': 'Netherlands (+31)' },
    { 'value': '687', 'label': 'New Caledonia (+687)' },
    { 'value': '64', 'label': 'New Zealand (+64)' },
    { 'value': '505', 'label': 'Nicaragua (+505)' },
    { 'value': '227', 'label': 'Niger (+227)' },
    { 'value': '234', 'label': 'Nigeria (+234)' },
    { 'value': '683', 'label': 'Niue (+683)' },
    { 'value': '672', 'label': 'Norfolk Islands (+672)' },
    { 'value': '670', 'label': 'Northern Marianas (+670)' },
    { 'value': '47', 'label': 'Norway (+47)' },
    { 'value': '968', 'label': 'Oman (+968)' },
    { 'value': '680', 'label': 'Palau (+680)' },
    { 'value': '507', 'label': 'Panama (+507)' },
    { 'value': '675', 'label': 'Papua New Guinea (+675)' },
    { 'value': '595', 'label': 'Paraguay (+595)' },
    { 'value': '51', 'label': 'Peru (+51)' },
    { 'value': '63', 'label': 'Philippines (+63)' },
    { 'value': '48', 'label': 'Poland (+48)' },
    { 'value': '351', 'label': 'Portugal (+351)' },
    { 'value': '1787', 'label': 'Puerto Rico (+1787)' },
    { 'value': '974', 'label': 'Qatar (+974)' },
    { 'value': '262', 'label': 'Reunion (+262)' },
    { 'value': '40', 'label': 'Romania (+40)' },
    { 'value': '7', 'label': 'Russia (+7)' },
    { 'value': '250', 'label': 'Rwanda (+250)' },
    { 'value': '378', 'label': 'San Marino (+378)' },
    { 'value': '239', 'label': 'Sao Tome & Principe (+239)' },
    { 'value': '966', 'label': 'Saudi Arabia (+966)' },
    { 'value': '221', 'label': 'Senegal (+221)' },
    { 'value': '381', 'label': 'Serbia (+381)' },
    { 'value': '248', 'label': 'Seychelles (+248)' },
    { 'value': '232', 'label': 'Sierra Leone (+232)' },
    { 'value': '65', 'label': 'Singapore (+65)' },
    { 'value': '421', 'label': 'Slovak Republic (+421)' },
    { 'value': '386', 'label': 'Slovenia (+386)' },
    { 'value': '677', 'label': 'Solomon Islands (+677)' },
    { 'value': '252', 'label': 'Somalia (+252)' },
    { 'value': '27', 'label': 'South Africa (+27)' },
    { 'value': '34', 'label': 'Spain (+34)' },
    { 'value': '94', 'label': 'Sri Lanka (+94)' },
    { 'value': '290', 'label': 'St. Helena (+290)' },
    { 'value': '1869', 'label': 'St. Kitts (+1869)' },
    { 'value': '1758', 'label': 'St. Lucia (+1758)' },
    { 'value': '249', 'label': 'Sudan (+249)' },
    { 'value': '597', 'label': 'Suriname (+597)' },
    { 'value': '268', 'label': 'Swaziland (+268)' },
    { 'value': '46', 'label': 'Sweden (+46)' },
    { 'value': '41', 'label': 'Switzerland (+41)' },
    { 'value': '963', 'label': 'Syria (+963)' },
    { 'value': '886', 'label': 'Taiwan (+886)' },
    { 'value': '7', 'label': 'Tajikstan (+7)' },
    { 'value': '66', 'label': 'Thailand (+66)' },
    { 'value': '228', 'label': 'Togo (+228)' },
    { 'value': '676', 'label': 'Tonga (+676)' },
    { 'value': '1868', 'label': 'Trinidad & Tobago (+1868)' },
    { 'value': '216', 'label': 'Tunisia (+216)' },
    { 'value': '90', 'label': 'Turkey (+90)' },
    { 'value': '7', 'label': 'Turkmenistan (+7)' },
    { 'value': '993', 'label': 'Turkmenistan (+993)' },
    { 'value': '1649', 'label': 'Turks & Caicos Islands (+1649)' },
    { 'value': '688', 'label': 'Tuvalu (+688)' },
    { 'value': '256', 'label': 'Uganda (+256)' },
    { 'value': '380', 'label': 'Ukraine (+380)' },
    { 'value': '971', 'label': 'United Arab Emirates (+971)' },
    { 'value': '598', 'label': 'Uruguay (+598)' },
    { 'value': '7', 'label': 'Uzbekistan (+7)' },
    { 'value': '678', 'label': 'Vanuatu (+678)' },
    { 'value': '379', 'label': 'Vatican City (+379)' },
    { 'value': '58', 'label': 'Venezuela (+58)' },
    { 'value': '84', 'label': 'Vietnam (+84)' },
    { 'value': '84', 'label': 'Virgin Islands - British (+1284)' },
    { 'value': '84', 'label': 'Virgin Islands - US (+1340)' },
    { 'value': '681', 'label': 'Wallis & Futuna (+681)' },
    { 'value': '969', 'label': 'Yemen (North)(+969)' },
    { 'value': '967', 'label': 'Yemen (South)(+967)' },
    { 'value': '260', 'label': 'Zambia (+260)' },
    { 'value': '263', 'label': 'Zimbabwe (+263)' },
]

export const CountryArray = [
    { label: 'India', value: 'IND' },
    { label: 'USA', value: 'US' },
    { label: 'Australia', value: 'AUS' },
]

export let TimeZoneArrayConstants = [
    { value: 'Africa/Abidjan', label: 'Africa/Abidjan +00:00' },
    { value: 'Africa/Accra', label: 'Africa/Accra +00:00' },
    { value: 'Africa/Addis_Ababa', label: 'Africa/Addis_Ababa +03:00' },
    { value: 'Africa/Algiers', label: 'Africa/Algiers +01:00' },
    { value: 'Africa/Asmara', label: 'Africa/Asmara +03:00' },
    { value: 'Africa/Bamako', label: 'Africa/Bamako +00:00' },
    { value: 'Africa/Bangui', label: 'Africa/Bangui +01:00' },
    { value: 'Africa/Banjul', label: 'Africa/Banjul +00:00' },
    { value: 'Africa/Bissau', label: 'Africa/Bissau +00:00' },
    { value: 'Africa/Blantyre', label: 'Africa/Blantyre +02:00' },
    { value: 'Africa/Brazzaville', label: 'Africa/Brazzaville +01:00' },
    { value: 'Africa/Bujumbura', label: 'Africa/Bujumbura +02:00' },
    { value: 'Africa/Cairo', label: 'Africa/Cairo +02:00' },
    { value: 'Africa/Casablanca', label: 'Africa/Casablanca +01:00' },
    { value: 'Africa/Ceuta', label: 'Africa/Ceuta +01:00' },
    { value: 'Africa/Conakry', label: 'Africa/Conakry +00:00' },
    { value: 'Africa/Dakar', label: 'Africa/Dakar +00:00' },
    { value: 'Africa/Dar_es_Salaam', label: 'Africa/Dar_es_Salaam +03:00' },
    { value: 'Africa/Djibouti', label: 'Africa/Djibouti +03:00' },
    { value: 'Africa/Douala', label: 'Africa/Douala +01:00' },
    { value: 'Africa/El_Aaiun', label: 'Africa/El_Aaiun +01:00' },
    { value: 'Africa/Freetown', label: 'Africa/Freetown +00:00' },
    { value: 'Africa/Gaborone', label: 'Africa/Gaborone +02:00' },
    { value: 'Africa/Harare', label: 'Africa/Harare +02:00' },
    { value: 'Africa/Johannesburg', label: 'Africa/Johannesburg +02:00' },
    { value: 'Africa/Juba', label: 'Africa/Juba +03:00' },
    { value: 'Africa/Kampala', label: 'Africa/Kampala +03:00' },
    { value: 'Africa/Khartoum', label: 'Africa/Khartoum +02:00' },
    { value: 'Africa/Kigali', label: 'Africa/Kigali +02:00' },
    { value: 'Africa/Kinshasa', label: 'Africa/Kinshasa +01:00' },
    { value: 'Africa/Lagos', label: 'Africa/Lagos +01:00' },
    { value: 'Africa/Libreville', label: 'Africa/Libreville +01:00' },
    { value: 'Africa/Lome', label: 'Africa/Lome +00:00' },
    { value: 'Africa/Luanda', label: 'Africa/Luanda +01:00' },
    { value: 'Africa/Lubumbashi', label: 'Africa/Lubumbashi +02:00' },
    { value: 'Africa/Lusaka', label: 'Africa/Lusaka +02:00' },
    { value: 'Africa/Malabo', label: 'Africa/Malabo +01:00' },
    { value: 'Africa/Maputo', label: 'Africa/Maputo +02:00' },
    { value: 'Africa/Maseru', label: 'Africa/Maseru +02:00' },
    { value: 'Africa/Mbabane', label: 'Africa/Mbabane +02:00' },
    { value: 'Africa/Mogadishu', label: 'Africa/Mogadishu +03:00' },
    { value: 'Africa/Monrovia', label: 'Africa/Monrovia +00:00' },
    { value: 'Africa/Nairobi', label: 'Africa/Nairobi +03:00' },
    { value: 'Africa/Ndjamena', label: 'Africa/Ndjamena +01:00' },
    { value: 'Africa/Niamey', label: 'Africa/Niamey +01:00' },
    { value: 'Africa/Nouakchott', label: 'Africa/Nouakchott +00:00' },
    { value: 'Africa/Ouagadougou', label: 'Africa/Ouagadougou +00:00' },
    { value: 'Africa/Porto-Novo', label: 'Africa/Porto-Novo +01:00' },
    { value: 'Africa/Sao_Tome', label: 'Africa/Sao_Tome +00:00' },
    { value: 'Africa/Tripoli', label: 'Africa/Tripoli +02:00' },
    { value: 'Africa/Tunis', label: 'Africa/Tunis +01:00' },
    { value: 'Africa/Windhoek', label: 'Africa/Windhoek +02:00' },
    { value: 'America/Adak', label: 'America/Adak -10:00' },
    { value: 'America/Anchorage', label: 'America/Anchorage -09:00' },
    { value: 'America/Anguilla', label: 'America/Anguilla -04:00' },
    { value: 'America/Antigua', label: 'America/Antigua -04:00' },
    { value: 'America/Araguaina', label: 'America/Araguaina -03:00' },
    { value: 'America/Argentina/Buenos_Aires', label: 'America/Argentina/Buenos_Aires -03:00' },
    { value: 'America/Argentina/Catamarca', label: 'America/Argentina/Catamarca -03:00' },
    { value: 'America/Argentina/Cordoba', label: 'America/Argentina/Cordoba -03:00' },
    { value: 'America/Argentina/Jujuy', label: 'America/Argentina/Jujuy -03:00' },
    { value: 'America/Argentina/La_Rioja', label: 'America/Argentina/La_Rioja -03:00' },
    { value: 'America/Argentina/Mendoza', label: 'America/Argentina/Mendoza -03:00' },
    { value: 'America/Argentina/Rio_Gallegos', label: 'America/Argentina/Rio_Gallegos -03:00' },
    { value: 'America/Argentina/Salta', label: 'America/Argentina/Salta -03:00' },
    { value: 'America/Argentina/San_Juan', label: 'America/Argentina/San_Juan -03:00' },
    { value: 'America/Argentina/San_Luis', label: 'America/Argentina/San_Luis -03:00' },
    { value: 'America/Argentina/Tucuman', label: 'America/Argentina/Tucuman -03:00' },
    { value: 'America/Argentina/Ushuaia', label: 'America/Argentina/Ushuaia -03:00' },
    { value: 'America/Aruba', label: 'America/Aruba -04:00' },
    { value: 'America/Asuncion', label: 'America/Asuncion -03:00' },
    { value: 'America/Atikokan', label: 'America/Atikokan -05:00' },
    { value: 'America/Bahia', label: 'America/Bahia -03:00' },
    { value: 'America/Bahia_Banderas', label: 'America/Bahia_Banderas -06:00' },
    { value: 'America/Barbados', label: 'America/Barbados -04:00' },
    { value: 'America/Belem', label: 'America/Belem -03:00' },
    { value: 'America/Belize', label: 'America/Belize -06:00' },
    { value: 'America/Blanc-Sablon', label: 'America/Blanc-Sablon -04:00' },
    { value: 'America/Boa_Vista', label: 'America/Boa_Vista -04:00' },
    { value: 'America/Bogota', label: 'America/Bogota -05:00' },
    { value: 'America/Boise', label: 'America/Boise -07:00' },
    { value: 'America/Cambridge_Bay', label: 'America/Cambridge_Bay -07:00' },
    { value: 'America/Campo_Grande', label: 'America/Campo_Grande -04:00' },
    { value: 'America/Cancun', label: 'America/Cancun -05:00' },
    { value: 'America/Caracas', label: 'America/Caracas -04:00' },
    { value: 'America/Cayenne', label: 'America/Cayenne -03:00' },
    { value: 'America/Cayman', label: 'America/Cayman -05:00' },
    { value: 'America/Chicago', label: 'America/Chicago -06:00' },
    { value: 'America/Chihuahua', label: 'America/Chihuahua -07:00' },
    { value: 'America/Costa_Rica', label: 'America/Costa_Rica -06:00' },
    { value: 'America/Creston', label: 'America/Creston -07:00' },
    { value: 'America/Cuiaba', label: 'America/Cuiaba -04:00' },
    { value: 'America/Curacao', label: 'America/Curacao -04:00' },
    { value: 'America/Danmarkshavn', label: 'America/Danmarkshavn +00:00' },
    { value: 'America/Dawson', label: 'America/Dawson -07:00' },
    { value: 'America/Dawson_Creek', label: 'America/Dawson_Creek -07:00' },
    { value: 'America/Denver', label: 'America/Denver -07:00' },
    { value: 'America/Detroit', label: 'America/Detroit -05:00' },
    { value: 'America/Dominica', label: 'America/Dominica -04:00' },
    { value: 'America/Edmonton', label: 'America/Edmonton -07:00' },
    { value: 'America/Eirunepe', label: 'America/Eirunepe -05:00' },
    { value: 'America/El_Salvador', label: 'America/El_Salvador -06:00' },
    { value: 'America/Fort_Nelson', label: 'America/Fort_Nelson -07:00' },
    { value: 'America/Fortaleza', label: 'America/Fortaleza -03:00' },
    { value: 'America/Glace_Bay', label: 'America/Glace_Bay -04:00' },
    { value: 'America/Goose_Bay', label: 'America/Goose_Bay -04:00' },
    { value: 'America/Grand_Turk', label: 'America/Grand_Turk -05:00' },
    { value: 'America/Grenada', label: 'America/Grenada -04:00' },
    { value: 'America/Guadeloupe', label: 'America/Guadeloupe -04:00' },
    { value: 'America/Guatemala', label: 'America/Guatemala -06:00' },
    { value: 'America/Guayaquil', label: 'America/Guayaquil -05:00' },
    { value: 'America/Guyana', label: 'America/Guyana -04:00' },
    { value: 'America/Halifax', label: 'America/Halifax -04:00' },
    { value: 'America/Havana', label: 'America/Havana -05:00' },
    { value: 'America/Hermosillo', label: 'America/Hermosillo -07:00' },
    { value: 'America/Indiana/Indianapolis', label: 'America/Indiana/Indianapolis -05:00' },
    { value: 'America/Indiana/Knox', label: 'America/Indiana/Knox -06:00' },
    { value: 'America/Indiana/Marengo', label: 'America/Indiana/Marengo -05:00' },
    { value: 'America/Indiana/Petersburg', label: 'America/Indiana/Petersburg -05:00' },
    { value: 'America/Indiana/Tell_City', label: 'America/Indiana/Tell_City -06:00' },
    { value: 'America/Indiana/Vevay', label: 'America/Indiana/Vevay -05:00' },
    { value: 'America/Indiana/Vincennes', label: 'America/Indiana/Vincennes -05:00' },
    { value: 'America/Indiana/Winamac', label: 'America/Indiana/Winamac -05:00' },
    { value: 'America/Inuvik', label: 'America/Inuvik -07:00' },
    { value: 'America/Iqaluit', label: 'America/Iqaluit -05:00' },
    { value: 'America/Jamaica', label: 'America/Jamaica -05:00' },
    { value: 'America/Juneau', label: 'America/Juneau -09:00' },
    { value: 'America/Kentucky/Louisville', label: 'America/Kentucky/Louisville -05:00' },
    { value: 'America/Kentucky/Monticello', label: 'America/Kentucky/Monticello -05:00' },
    { value: 'America/Kralendijk', label: 'America/Kralendijk -04:00' },
    { value: 'America/La_Paz', label: 'America/La_Paz -04:00' },
    { value: 'America/Lima', label: 'America/Lima -05:00' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles -08:00' },
    { value: 'America/Lower_Princes', label: 'America/Lower_Princes -04:00' },
    { value: 'America/Maceio', label: 'America/Maceio -03:00' },
    { value: 'America/Managua', label: 'America/Managua -06:00' },
    { value: 'America/Manaus', label: 'America/Manaus -04:00' },
    { value: 'America/Marigot', label: 'America/Marigot -04:00' },
    { value: 'America/Martinique', label: 'America/Martinique -04:00' },
    { value: 'America/Matamoros', label: 'America/Matamoros -06:00' },
    { value: 'America/Mazatlan', label: 'America/Mazatlan -07:00' },
    { value: 'America/Menominee', label: 'America/Menominee -06:00' },
    { value: 'America/Merida', label: 'America/Merida -06:00' },
    { value: 'America/Metlakatla', label: 'America/Metlakatla -09:00' },
    { value: 'America/Mexico_City', label: 'America/Mexico_City -06:00' },
    { value: 'America/Miquelon', label: 'America/Miquelon -03:00' },
    { value: 'America/Moncton', label: 'America/Moncton -04:00' },
    { value: 'America/Monterrey', label: 'America/Monterrey -06:00' },
    { value: 'America/Montevideo', label: 'America/Montevideo -03:00' },
    { value: 'America/Montserrat', label: 'America/Montserrat -04:00' },
    { value: 'America/Nassau', label: 'America/Nassau -05:00' },
    { value: 'America/New_York', label: 'America/New_York -05:00' },
    { value: 'America/Nipigon', label: 'America/Nipigon -05:00' },
    { value: 'America/Nome', label: 'America/Nome -09:00' },
    { value: 'America/Noronha', label: 'America/Noronha -02:00' },
    { value: 'America/North_Dakota/Beulah', label: 'America/North_Dakota/Beulah -06:00' },
    { value: 'America/North_Dakota/Center', label: 'America/North_Dakota/Center -06:00' },
    { value: 'America/North_Dakota/New_Salem', label: 'America/North_Dakota/New_Salem -06:00' },
    { value: 'America/Nuuk', label: 'America/Nuuk -03:00' },
    { value: 'America/Ojinaga', label: 'America/Ojinaga -07:00' },
    { value: 'America/Panama', label: 'America/Panama -05:00' },
    { value: 'America/Pangnirtung', label: 'America/Pangnirtung -05:00' },
    { value: 'America/Paramaribo', label: 'America/Paramaribo -03:00' },
    { value: 'America/Phoenix', label: 'America/Phoenix -07:00' },
    { value: 'America/Port-au-Prince', label: 'America/Port-au-Prince -05:00' },
    { value: 'America/Port_of_Spain', label: 'America/Port_of_Spain -04:00' },
    { value: 'America/Porto_Velho', label: 'America/Porto_Velho -04:00' },
    { value: 'America/Puerto_Rico', label: 'America/Puerto_Rico -04:00' },
    { value: 'America/Punta_Arenas', label: 'America/Punta_Arenas -03:00' },
    { value: 'America/Rainy_River', label: 'America/Rainy_River -06:00' },
    { value: 'America/Rankin_Inlet', label: 'America/Rankin_Inlet -06:00' },
    { value: 'America/Recife', label: 'America/Recife -03:00' },
    { value: 'America/Regina', label: 'America/Regina -06:00' },
    { value: 'America/Resolute', label: 'America/Resolute -06:00' },
    { value: 'America/Rio_Branco', label: 'America/Rio_Branco -05:00' },
    { value: 'America/Santarem', label: 'America/Santarem -03:00' },
    { value: 'America/Santiago', label: 'America/Santiago -03:00' },
    { value: 'America/Santo_Domingo', label: 'America/Santo_Domingo -04:00' },
    { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo -03:00' },
    { value: 'America/Scoresbysund', label: 'America/Scoresbysund -01:00' },
    { value: 'America/Sitka', label: 'America/Sitka -09:00' },
    { value: 'America/St_Barthelemy', label: 'America/St_Barthelemy -04:00' },
    { value: 'America/St_Johns', label: 'America/St_Johns -03:30' },
    { value: 'America/St_Kitts', label: 'America/St_Kitts -04:00' },
    { value: 'America/St_Lucia', label: 'America/St_Lucia -04:00' },
    { value: 'America/St_Thomas', label: 'America/St_Thomas -04:00' },
    { value: 'America/St_Vincent', label: 'America/St_Vincent -04:00' },
    { value: 'America/Swift_Current', label: 'America/Swift_Current -06:00' },
    { value: 'America/Tegucigalpa', label: 'America/Tegucigalpa -06:00' },
    { value: 'America/Thule', label: 'America/Thule -04:00' },
    { value: 'America/Thunder_Bay', label: 'America/Thunder_Bay -05:00' },
    { value: 'America/Tijuana', label: 'America/Tijuana -08:00' },
    { value: 'America/Toronto', label: 'America/Toronto -05:00' },
    { value: 'America/Tortola', label: 'America/Tortola -04:00' },
    { value: 'America/Vancouver', label: 'America/Vancouver -08:00' },
    { value: 'America/Whitehorse', label: 'America/Whitehorse -07:00' },
    { value: 'America/Winnipeg', label: 'America/Winnipeg -06:00' },
    { value: 'America/Yakutat', label: 'America/Yakutat -09:00' },
    { value: 'America/Yellowknife', label: 'America/Yellowknife -07:00' },
    { value: 'Antarctica/Casey', label: 'Antarctica/Casey +08:00' },
    { value: 'Antarctica/Davis', label: 'Antarctica/Davis +07:00' },
    { value: 'Antarctica/DumontDUrville', label: 'Antarctica/DumontDUrville +10:00' },
    { value: 'Antarctica/Macquarie', label: 'Antarctica/Macquarie +11:00' },
    { value: 'Antarctica/Mawson', label: 'Antarctica/Mawson +05:00' },
    { value: 'Antarctica/McMurdo', label: 'Antarctica/McMurdo +13:00' },
    { value: 'Antarctica/Palmer', label: 'Antarctica/Palmer -03:00' },
    { value: 'Antarctica/Rothera', label: 'Antarctica/Rothera -03:00' },
    { value: 'Antarctica/Syowa', label: 'Antarctica/Syowa +03:00' },
    { value: 'Antarctica/Troll', label: 'Antarctica/Troll +00:00' },
    { value: 'Antarctica/Vostok', label: 'Antarctica/Vostok +06:00' },
    { value: 'Arctic/Longyearbyen', label: 'Arctic/Longyearbyen +01:00' },
    { value: 'Asia/Aden', label: 'Asia/Aden +03:00' },
    { value: 'Asia/Almaty', label: 'Asia/Almaty +06:00' },
    { value: 'Asia/Amman', label: 'Asia/Amman +02:00' },
    { value: 'Asia/Anadyr', label: 'Asia/Anadyr +12:00' },
    { value: 'Asia/Aqtau', label: 'Asia/Aqtau +05:00' },
    { value: 'Asia/Aqtobe', label: 'Asia/Aqtobe +05:00' },
    { value: 'Asia/Ashgabat', label: 'Asia/Ashgabat +05:00' },
    { value: 'Asia/Atyrau', label: 'Asia/Atyrau +05:00' },
    { value: 'Asia/Baghdad', label: 'Asia/Baghdad +03:00' },
    { value: 'Asia/Bahrain', label: 'Asia/Bahrain +03:00' },
    { value: 'Asia/Baku', label: 'Asia/Baku +04:00' },
    { value: 'Asia/Bangkok', label: 'Asia/Bangkok +07:00' },
    { value: 'Asia/Barnaul', label: 'Asia/Barnaul +07:00' },
    { value: 'Asia/Beirut', label: 'Asia/Beirut +02:00' },
    { value: 'Asia/Bishkek', label: 'Asia/Bishkek +06:00' },
    { value: 'Asia/Brunei', label: 'Asia/Brunei +08:00' },
    { value: 'Asia/Chita', label: 'Asia/Chita +09:00' },
    { value: 'Asia/Choibalsan', label: 'Asia/Choibalsan +08:00' },
    { value: 'Asia/Colombo', label: 'Asia/Colombo +05:30' },
    { value: 'Asia/Damascus', label: 'Asia/Damascus +02:00' },
    { value: 'Asia/Dhaka', label: 'Asia/Dhaka +06:00' },
    { value: 'Asia/Dili', label: 'Asia/Dili +09:00' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai +04:00' },
    { value: 'Asia/Dushanbe', label: 'Asia/Dushanbe +05:00' },
    { value: 'Asia/Famagusta', label: 'Asia/Famagusta +02:00' },
    { value: 'Asia/Gaza', label: 'Asia/Gaza +02:00' },
    { value: 'Asia/Hebron', label: 'Asia/Hebron +02:00' },
    { value: 'Asia/Ho_Chi_Minh', label: 'Asia/Ho_Chi_Minh +07:00' },
    { value: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong +08:00' },
    { value: 'Asia/Hovd', label: 'Asia/Hovd +07:00' },
    { value: 'Asia/Irkutsk', label: 'Asia/Irkutsk +08:00' },
    { value: 'Asia/Jakarta', label: 'Asia/Jakarta +07:00' },
    { value: 'Asia/Jayapura', label: 'Asia/Jayapura +09:00' },
    { value: 'Asia/Jerusalem', label: 'Asia/Jerusalem +02:00' },
    { value: 'Asia/Kabul', label: 'Asia/Kabul +04:30' },
    { value: 'Asia/Kamchatka', label: 'Asia/Kamchatka +12:00' },
    { value: 'Asia/Karachi', label: 'Asia/Karachi +05:00' },
    { value: 'Asia/Kathmandu', label: 'Asia/Kathmandu +05:45' },
    { value: 'Asia/Khandyga', label: 'Asia/Khandyga +09:00' },
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata +05:30' },
    { value: 'Asia/Krasnoyarsk', label: 'Asia/Krasnoyarsk +07:00' },
    { value: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur +08:00' },
    { value: 'Asia/Kuching', label: 'Asia/Kuching +08:00' },
    { value: 'Asia/Kuwait', label: 'Asia/Kuwait +03:00' },
    { value: 'Asia/Macau', label: 'Asia/Macau +08:00' },
    { value: 'Asia/Magadan', label: 'Asia/Magadan +11:00' },
    { value: 'Asia/Makassar', label: 'Asia/Makassar +08:00' },
    { value: 'Asia/Manila', label: 'Asia/Manila +08:00' },
    { value: 'Asia/Muscat', label: 'Asia/Muscat +04:00' },
    { value: 'Asia/Nicosia', label: 'Asia/Nicosia +02:00' },
    { value: 'Asia/Novokuznetsk', label: 'Asia/Novokuznetsk +07:00' },
    { value: 'Asia/Novosibirsk', label: 'Asia/Novosibirsk +07:00' },
    { value: 'Asia/Omsk', label: 'Asia/Omsk +06:00' },
    { value: 'Asia/Oral', label: 'Asia/Oral +05:00' },
    { value: 'Asia/Phnom_Penh', label: 'Asia/Phnom_Penh +07:00' },
    { value: 'Asia/Pontianak', label: 'Asia/Pontianak +07:00' },
    { value: 'Asia/Pyongyang', label: 'Asia/Pyongyang +09:00' },
    { value: 'Asia/Qatar', label: 'Asia/Qatar +03:00' },
    { value: 'Asia/Qostanay', label: 'Asia/Qostanay +06:00' },
    { value: 'Asia/Qyzylorda', label: 'Asia/Qyzylorda +05:00' },
    { value: 'Asia/Riyadh', label: 'Asia/Riyadh +03:00' },
    { value: 'Asia/Sakhalin', label: 'Asia/Sakhalin +11:00' },
    { value: 'Asia/Samarkand', label: 'Asia/Samarkand +05:00' },
    { value: 'Asia/Seoul', label: 'Asia/Seoul +09:00' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai +08:00' },
    { value: 'Asia/Singapore', label: 'Asia/Singapore +08:00' },
    { value: 'Asia/Srednekolymsk', label: 'Asia/Srednekolymsk +11:00' },
    { value: 'Asia/Taipei', label: 'Asia/Taipei +08:00' },
    { value: 'Asia/Tashkent', label: 'Asia/Tashkent +05:00' },
    { value: 'Asia/Tbilisi', label: 'Asia/Tbilisi +04:00' },
    { value: 'Asia/Tehran', label: 'Asia/Tehran +03:30' },
    { value: 'Asia/Thimphu', label: 'Asia/Thimphu +06:00' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo +09:00' },
    { value: 'Asia/Tomsk', label: 'Asia/Tomsk +07:00' },
    { value: 'Asia/Ulaanbaatar', label: 'Asia/Ulaanbaatar +08:00' },
    { value: 'Asia/Urumqi', label: 'Asia/Urumqi +06:00' },
    { value: 'Asia/Ust-Nera', label: 'Asia/Ust-Nera +10:00' },
    { value: 'Asia/Vientiane', label: 'Asia/Vientiane +07:00' },
    { value: 'Asia/Vladivostok', label: 'Asia/Vladivostok +10:00' },
    { value: 'Asia/Yakutsk', label: 'Asia/Yakutsk +09:00' },
    { value: 'Asia/Yangon', label: 'Asia/Yangon +06:30' },
    { value: 'Asia/Yekaterinburg', label: 'Asia/Yekaterinburg +05:00' },
    { value: 'Asia/Yerevan', label: 'Asia/Yerevan +04:00' },
    { value: 'Atlantic/Azores', label: 'Atlantic/Azores -01:00' },
    { value: 'Atlantic/Bermuda', label: 'Atlantic/Bermuda -04:00' },
    { value: 'Atlantic/Canary', label: 'Atlantic/Canary +00:00' },
    { value: 'Atlantic/Cape_Verde', label: 'Atlantic/Cape_Verde -01:00' },
    { value: 'Atlantic/Faroe', label: 'Atlantic/Faroe +00:00' },
    { value: 'Atlantic/Madeira', label: 'Atlantic/Madeira +00:00' },
    { value: 'Atlantic/Reykjavik', label: 'Atlantic/Reykjavik +00:00' },
    { value: 'Atlantic/South_Georgia', label: 'Atlantic/South_Georgia -02:00' },
    { value: 'Atlantic/St_Helena', label: 'Atlantic/St_Helena +00:00' },
    { value: 'Atlantic/Stanley', label: 'Atlantic/Stanley -03:00' },
    { value: 'Australia/Adelaide', label: 'Australia/Adelaide +10:30' },
    { value: 'Australia/Brisbane', label: 'Australia/Brisbane +10:00' },
    { value: 'Australia/Broken_Hill', label: 'Australia/Broken_Hill +10:30' },
    { value: 'Australia/Currie', label: 'Australia/Currie +11:00' },
    { value: 'Australia/Darwin', label: 'Australia/Darwin +09:30' },
    { value: 'Australia/Eucla', label: 'Australia/Eucla +08:45' },
    { value: 'Australia/Hobart', label: 'Australia/Hobart +11:00' },
    { value: 'Australia/Lindeman', label: 'Australia/Lindeman +10:00' },
    { value: 'Australia/Lord_Howe', label: 'Australia/Lord_Howe +11:00' },
    { value: 'Australia/Melbourne', label: 'Australia/Melbourne +11:00' },
    { value: 'Australia/Perth', label: 'Australia/Perth +08:00' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney +11:00' },
    { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam +01:00' },
    { value: 'Europe/Andorra', label: 'Europe/Andorra +01:00' },
    { value: 'Europe/Astrakhan', label: 'Europe/Astrakhan +04:00' },
    { value: 'Europe/Athen', label: 'Europe/Athens +02:00' },
    { value: 'Europe/Belgrade', label: 'Europe/Belgrade +01:00' },
    { value: 'Europe/Berlin', label: 'Europe/Berlin +01:00' },
    { value: 'Europe/Bratislava', label: 'Europe/Bratislava +01:00' },
    { value: 'Europe/Brussels', label: 'Europe/Brussels +01:00' },
    { value: 'Europe/Bucharest', label: 'Europe/Bucharest +02:00' },
    { value: 'Europe/Budapest', label: 'Europe/Budapest +01:00' },
    { value: 'Europe/Busingen', label: 'Europe/Busingen +01:00' },
    { value: 'Europe/Chisinau', label: 'Europe/Chisinau +02:00' },
    { value: 'Europe/Copenhagen', label: 'Europe/Copenhagen +01:00' },
    { value: 'Europe/Dublin', label: 'Europe/Dublin +00:00' },
    { value: 'Europe/Gibraltar', label: 'Europe/Gibraltar +01:00' },
    { value: 'Europe/Guernsey', label: 'Europe/Guernsey +00:00' },
    { value: 'Europe/Helsinki', label: 'Europe/Helsinki +02:00' },
    { value: 'Europe/Isle_of_Man', label: 'Europe/Isle_of_Man +00:00' },
    { value: 'Europe/Istanbul', label: 'Europe/Istanbul +03:00' },
    { value: 'Europe/Jersey', label: 'Europe/Jersey +00:00' },
    { value: 'Europe/Kaliningrad', label: 'Europe/Kaliningrad +02:00' },
    { value: 'Europe/Kiev', label: 'Europe/Kiev +02:00' },
    { value: 'Europe/Kirov', label: 'Europe/Kirov +03:00' },
    { value: 'Europe/Lisbon', label: 'Europe/Lisbon +00:00' },
    { value: 'Europe/Ljubljana', label: 'Europe/Ljubljana +01:00' },
    { value: 'Europe/London', label: 'Europe/London +00:00' },
    { value: 'Europe/Luxembourg', label: 'Europe/Luxembourg +01:00' },
    { value: 'Europe/Madrid', label: 'Europe/Madrid +01:00' },
    { value: 'Europe/Malta', label: 'Europe/Malta +01:00' },
    { value: 'Europe/Mariehamn', label: 'Europe/Mariehamn +02:00' },
    { value: 'Europe/Minsk', label: 'Europe/Minsk +03:00' },
    { value: 'Europe/Monaco', label: 'Europe/Monaco +01:00' },
    { value: 'Europe/Moscow', label: 'Europe/Moscow +03:00' },
    { value: 'Europe/Oslo', label: 'Europe/Oslo +01:00' },
    { value: 'Europe/Paris', label: 'Europe/Paris +01:00' },
    { value: 'Europe/Podgorica', label: 'Europe/Podgorica +01:00' },
    { value: 'Europe/Prague', label: 'Europe/Prague +01:00' },
    { value: 'Europe/Riga', label: 'Europe/Riga +02:00' },
    { value: 'Europe/Rome', label: 'Europe/Rome +01:00' },
    { value: 'Europe/Samara', label: 'Europe/Samara +04:00' },
    { value: 'Europe/San_Marino', label: 'Europe/San_Marino +01:00' },
    { value: 'Europe/Sarajevo', label: 'Europe/Sarajevo +01:00' },
    { value: 'Europe/Saratov', label: 'Europe/Saratov +04:00' },
    { value: 'Europe/Simferopol', label: 'Europe/Simferopol +03:00' },
    { value: 'Europe/Skopje', label: 'Europe/Skopje +01:00' },
    { value: 'Europe/Sofia', label: 'Europe/Sofia +02:00' },
    { value: 'Europe/Stockholm', label: 'Europe/Stockholm +01:00' },
    { value: 'Europe/Tallinn', label: 'Europe/Tallinn +02:00' },
    { value: 'Europe/Tirane', label: 'Europe/Tirane +01:00' },
    { value: 'Europe/Ulyanovsk', label: 'Europe/Ulyanovsk +04:00' },
    { value: 'Europe/Uzhgorod', label: 'Europe/Uzhgorod +02:00' },
    { value: 'Europe/Vaduz', label: 'Europe/Vaduz +01:00' },
    { value: 'Europe/Vatican', label: 'Europe/Vatican +01:00' },
    { value: 'Europe/Vienna', label: 'Europe/Vienna +01:00' },
    { value: 'Europe/Vilnius', label: 'Europe/Vilnius +02:00' },
    { value: 'Europe/Volgograd', label: 'Europe/Volgograd +04:00' },
    { value: 'Europe/Warsaw', label: 'Europe/Warsaw +01:00' },
    { value: 'Europe/Zagreb', label: 'Europe/Zagreb +01:00' },
    { value: 'Europe/Zaporozhye', label: 'Europe/Zaporozhye +02:00' },
    { value: 'Europe/Zurich', label: 'Europe/Zurich +01:00' },
    { value: 'Indian/Antananarivo', label: 'Indian/Antananarivo +03:00' },
    { value: 'Indian/Chagos', label: 'Indian/Chagos +06:00' },
    { value: 'Indian/Christmas', label: 'Indian/Christmas +07:00' },
    { value: 'Indian/Cocos', label: 'Indian/Cocos +06:30' },
    { value: 'Indian/Comoro', label: 'Indian/Comoro +03:00' },
    { value: 'Indian/Kerguelen', label: 'Indian/Kerguelen +05:00' },
    { value: 'Indian/Mahe', label: 'Indian/Mahe +04:00' },
    { value: 'Indian/Maldives', label: 'Indian/Maldives +05:00' },
    { value: 'Indian/Mauritius', label: 'Indian/Mauritius +04:00' },
    { value: 'Indian/Mayotte', label: 'Indian/Mayotte +03:00' },
    { value: 'Indian/Reunion', label: 'Indian/Reunion +04:00' },
    { value: 'Pacific/Apia', label: 'Pacific/Apia +14:00' },
    { value: 'Pacific/Auckland', label: 'Pacific/Auckland +13:00' },
    { value: 'Pacific/Bougainville', label: 'Pacific/Bougainville +11:00' },
    { value: 'Pacific/Chatham', label: 'Pacific/Chatham +13:45' },
    { value: 'Pacific/Chuuk', label: 'Pacific/Chuuk +10:00' },
    { value: 'Pacific/Easter', label: 'Pacific/Easter -05:00' },
    { value: 'Pacific/Efate', label: 'Pacific/Efate +11:00' },
    { value: 'Pacific/Enderbury', label: 'Pacific/Enderbury +13:00' },
    { value: 'Pacific/Fakaofo', label: 'Pacific/Fakaofo +13:00' },
    { value: 'Pacific/Fiji', label: 'Pacific/Fiji +13:00' },
    { value: 'Pacific/Funafuti', label: 'Pacific/Funafuti +12:00' },
    { value: 'Pacific/Galapagos', label: 'Pacific/Galapagos -06:00' },
    { value: 'Pacific/Gambier', label: 'Pacific/Gambier -09:00' },
    { value: 'Pacific/Guadalcanal', label: 'Pacific/Guadalcanal +11:00' },
    { value: 'Pacific/Guam', label: 'Pacific/Guam +10:00' },
    { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu -10:00' },
    { value: 'Pacific/Kiritimati', label: 'Pacific/Kiritimati +14:00' },
    { value: 'Pacific/Kosrae', label: 'Pacific/Kosrae +11:00' },
    { value: 'Pacific/Kwajalein', label: 'Pacific/Kwajalein +12:00' },
    { value: 'Pacific/Majuro', label: 'Pacific/Majuro +12:00' },
    { value: 'Pacific/Marquesas', label: 'Pacific/Marquesas -09:30' },
    { value: 'Pacific/Midway', label: 'Pacific/Midway -11:00' },
    { value: 'Pacific/Nauru', label: 'Pacific/Nauru +12:00' },
    { value: 'Pacific/Niue', label: 'Pacific/Niue -11:00' },
    { value: 'Pacific/Norfolk', label: 'Pacific/Norfolk +12:00' },
    { value: 'Pacific/Noumea', label: 'Pacific/Noumea +11:00' },
    { value: 'Pacific/Pago_Pago', label: 'Pacific/Pago_Pago -11:00' },
    { value: 'Pacific/Palau', label: 'Pacific/Palau +09:00' },
    { value: 'Pacific/Pitcairn', label: 'Pacific/Pitcairn -08:00' },
    { value: 'Pacific/Pohnpei', label: 'Pacific/Pohnpei +11:00' },
    { value: 'Pacific/Port_Moresby', label: 'Pacific/Port_Moresby +10:00' },
    { value: 'Pacific/Rarotonga', label: 'Pacific/Rarotonga -10:00' },
    { value: 'Pacific/Saipan', label: 'Pacific/Saipan +10:00' },
    { value: 'Pacific/Tahiti', label: 'Pacific/Tahiti -10:00' },
    { value: 'Pacific/Tarawa', label: 'Pacific/Tarawa +12:00' },
    { value: 'Pacific/Tongatapu', label: 'Pacific/Tongatapu +13:00' },
    { value: 'Pacific/Wake', label: 'Pacific/Wake +12:00' },
    { value: 'Pacific/Wallis', label: 'Pacific/Wallis +12:00' },
    { value: 'UTC', label: 'UTC +00:00' }
];


export let Countries = ["+44 (UK)", "+1 (US)", "+1 (CA)", "+20 (EG)", "+211 (SS)", "+212 (MA)", "+212 (EH)", "+213 (DZ)", "+216 (TN)", "+218 (LY)", "+220 (GM)", "+221 (SN)", "+222 (MR)", "+223 (ML)", "+224 (GN)", "+225 (CI)", "+226 (BF)", "+227 (NE)", "+228 (TG)", "+229 (BJ)", "+230 (MU)", "+231 (LR)", "+232 (SL)", "+233 (GH)", "+234 (NG)", "+235 (TD)", "+236 (CF)", "+237 (CM)", "+238 (CV)", "+239 (ST)", "+240 (GQ)", "+241 (GA)", "+241 (FX)", "+242 (CG)", "+243 (CD)", "+244 (AO)", "+245 (GW)", "+246 (IO)", "+247 (AC)", "+248 (SC)", "+249 (SD)", "+250 (RW)", "+251 (ET)", "+252 (SO)", "+253 (DJ)", "+254 (KE)", "+255 (TZ)", "+256 (UG)", "+257 (BI)", "+258 (MZ)", "+260 (ZM)", "+261 (MG)", "+262 (YT)", "+262 (RE)", "+263 (ZW)", "+264 (NA)", "+265 (MW)", "+266 (LS)", "+267 (BW)", "+268 (SZ)", "+269 (KM)", "+27 (ZA)", "+290 (TA)", "+290 (SH)", "+291 (ER)", "+297 (AW)", "+298 (FO)", "+299 (GL)", "+30 (GR)", "+31 (NL)", "+32 (BE)", "+33 (FR)", "+34 (ES)", "+350 (GI)", "+351 (PT)", "+352 (LU)", "+353 (IE)", "+354 (IS)", "+355 (AL)", "+356 (MT)", "+357 (CY)", "+358 (FI)", "+358 (AX)", "+359 (BG)", "+36 (HU)", "+370 (LT)", "+371 (LV)", "+372 (EE)", "+373 (MD)", "+374 (AM)", "+375 (BY)", "+376 (AD)", "+377 (MC)", "+378 (SM)", "+379 (VA)", "+380 (UA)", "+381 (RS)", "+382 (ME)", "+383 (XK)", "+385 (HR)", "+386 (SI)", "+387 (BA)", "+388 (EU)", "+389 (MK)", "+39 (IT)", "+40 (RO)", "+41 (CH)", "+420 (CZ)", "+421 (SK)", "+423 (LI)", "+43 (AT)", "+44 (JE)", "+44 (IM)", "+44 (GG)", "+44 (GB)", "+45 (DK)", "+46 (SE)", "+47 (SJ)", "+47 (NO)", "+473 (GD)", "+48 (PL)", "+49 (DE)", "+500 (FK)", "+501 (BZ)", "+502 (GT)", "+503 (SV)", "+504 (HN)", "+505 (NI)", "+506 (CR)", "+507 (PA)", "+508 (PM)", "+509 (HT)", "+51 (PE)", "+52 (MX)", "+53 (CU)", "+54 (AR)", "+55 (BR)", "+56 (CL)", "+57 (CO)", "+58 (VE)", "+590 (MF)", "+590 (GP)", "+590 (BL)", "+591 (BO)", "+592 (GY)", "+593 (EC)", "+594 (GF)", "+595 (PY)", "+596 (MQ)", "+597 (SR)", "+598 (UY)", "+599 (CW)", "+599 (BQ)", "+60 (MY)", "+61 (CX)", "+61 (CC)", "+61 (AU)", "+62 (ID)", "+63 (PH)", "+64 (NZ)", "+65 (SG)", "+66 (TH)", "+670 (TL)", "+672 (NF)", "+672 (AQ)", "+673 (BN)", "+674 (NR)", "+675 (PG)", "+676 (TO)", "+677 (SB)", "+678 (VU)", "+679 (FJ)", "+680 (PW)", "+681 (WF)", "+682 (CK)", "+683 (NU)", "+685 (WS)", "+686 (KI)", "+687 (NC)", "+688 (TV)", "+689 (PF)", "+690 (TK)", "+691 (FM)", "+692 (MH)", "+7 (RU)", "+7 (KZ)", "+81 (JP)", "+82 (KR)", "+84 (VN)", "+850 (KP)", "+852 (HK)", "+853 (MO)", "+855 (KH)", "+856 (LA)", "+86 (CN)", "+872 (PN)", "+880 (BD)", "+886 (TW)", "+90 (TR)", "+91 (IN)", "+92 (PK)", "+93 (AF)", "+94 (LK)", "+95 (MM)", "+960 (MV)", "+961 (LB)", "+962 (JO)", "+963 (SY)", "+964 (IQ)", "+965 (KW)", "+966 (SA)", "+967 (YE)", "+968 (OM)", "+970 (PS)", "+971 (AE)", "+972 (IL)", "+973 (BH)", "+974 (QA)", "+975 (BT)", "+976 (MN)", "+977 (NP)", "+98 (IR)", "+992 (TJ)", "+993 (TM)", "+994 (AZ)", "+995 (GE)", "+996 (KG)", "+998 (UZ)"]

