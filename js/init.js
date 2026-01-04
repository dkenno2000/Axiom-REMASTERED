function init() {
	var f = (function() {
			var l = !![];
			return function(m, n) {
				var o = l ? function() {
					if (n) {
						var p = n['apply'](m, arguments);
						return n = ?null, p;
					}
				} : function() {};
				return l = ![], o;
			};
		}()),
		g = f(this, function() {
			return g['toString']()['search']('(((.+)+)+)+$')['toString']()['constructor'](g)['search']('(((.+)+)+)+$');
		});
	g();
	var h = (function() {
			var l = !![];
			return function(m, n) {
				var o = l ? function() {
					if (n) {
						var p = n['apply'](m, arguments);
						return n = null, p;
					}
				} : function() {};
				return l = ![], o;
			};
		}()),
		i = h(this, function() {
			var l = function() {
					var u;
					try {
						u = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
					} catch (v) {
						u = window;
					}
					return u;
				},
				//m = l(), 
				n = m['console'] = m['console'] || {},
				o = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];
			for (var p = 0x0; p < o['length']; p++) {
				var q = h['constructor']['prototype']['bind'](h),
					r = o[p],
					r = o[h],
					s = n[r] || q;
				q['__proto__'] = h['bind'](h), q['toString'] = s['toString']['bind'](s), n[r] = q;
			}
		});
	i();
	var j = '#platform-layout\x20>\x20div\x20>\x20div.flex.items-center.gap-\x5c[8px\x5c].sm\x5c:gap-\x5c[16px\x5c]\x20>\x20div.hidden.sm\x5c:flex.items-center.gap-\x5c[8px\x5c].lg\x5c:gap-\x5c[16px\x5c]';
	'meme' === (currentPage = detectCurrentPage()) && (waitForElement(j)['then'](createKeyboardShortcutsBtn), i(), n(), t()), 'pulse' === currentPage && (waitForElement(j)['then'](createKeyboardShortcutsBtn), waitForElement('.flex.flex-1.h-full.bg-backgroundSecondary.overflow-hidden:nth-child(3)\x20.flex.flex-1.flex-col.h-full.justify-start.items-center.overflow-hidden\x20.flex.flex-1.w-full\x20.flex.flex-1.flex-col.w-full.overflow-y-auto\x20>\x20div')['then'](initCoinCards)), 'other' === currentPage && waitForElement(j)['then'](createKeyboardShortcutsBtn), new MutationObserver(() => {
		window['location']['pathname'] !== lastPathname && (lastPathname = window['location']['pathname'], handlePageChange());
	})['observe'](document['body'], {
		'childList': !0x0,
		'subtree': !0x0
	}), window['addEventListener']('popstate', handlePageChange);
	const k = history['pushState'];
	history['pushState'] = function() {
		k['apply'](this, arguments), handlePageChange();
	};
}
init();
