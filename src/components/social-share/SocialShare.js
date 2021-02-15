import React from 'react'
import config from '../../../client-config';

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";



const SocialShare = ( { path } ) => {
    
    const { siteUrl }  = config;
    const shareUrl = `${siteUrl}${path}`;

    return (
        <div className="social-share">
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}> 
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
        </div>
    )
}

export default SocialShare
