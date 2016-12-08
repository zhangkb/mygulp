function processError(ret) {
        var msg;
        switch (ret) {
            case 4:
                msg = '稍后重试';
                break;
            case 6:
                msg = '活动已结束';
                break;
            case 5:
                msg = '活动未开始';
                break;
            case 10:
                msg = '请输入正确的手机号';
                break;
            case 21:
                msg = '验证码有误';
                break;
            case 22:
                msg = '您暂时还不能参加此次活动';
                break;
            case 23:
                msg = '礼品已抢光';
                break;
            default:
                msg = '粗错咯,待会儿再试';
        }
        return msg;
    }