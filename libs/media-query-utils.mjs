export default class MediaQueryUtils{

	static itMatches(mq){
		const mql = window.matchMedia(mq);
		return mql.matches;
	}


	static observeMediaQuery(mq, cb){
		const has_cb = cb && typeof cb === 'function';

		const mql = window.matchMedia(mq);

		mql.addListener(e => {
			if(has_cb)
				cb(e);
		});

		if(has_cb)
			cb(mql);
	}

}