import perfittCircleLogo from '../assets/images/perfitt-circle-logo.svg';
import abcMart from '../assets/images/abcmart.svg';

export const getPartnerBrand = (link: string) => {
    if (link.includes('a-rt.com'))
        return {
            'image': abcMart,
            'name': "ABC Mart"
        };

    else if (link.includes('shoemarker.co.kr'))
        return {
            'image': perfittCircleLogo,
            'name': "Shoemarker"
        };

    else if (link.includes('kolonmall.com'))
        return {
            'image': perfittCircleLogo,
            'name': "Kolon Mall"
        };

    else return {
        'image': perfittCircleLogo,
        'name': "Perfitt"
    };;
};
