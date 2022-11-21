const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')



// Rtc Examples
const generate_token = (channelName, uid)=>{
    const appID = process.env.APPID;
    const appCertificate = process.env.APPCERTIFICATE;
    // channelName = channelName;
    // const uid = uid;
    // const account = "2882341273";
    const role = RtcRole.PUBLISHER;
    
    const expirationTimeInSeconds = 3600
    
    const currentTimestamp = Math.floor(Date.now() / 1000)
    
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + tokenA);
    return tokenA;
}

module.exports = generate_token;