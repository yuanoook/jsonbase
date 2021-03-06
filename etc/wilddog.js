(function () {
    var define = null;
    ! function (e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            var t;
            "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" !=
                typeof self && (t = self), t.eio = e()
        }
    }(function () {
        var e;
        return function t(e, r, n) {
            function o(i, a) {
                if (!r[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!a && c) return c(i, !0);
                        if (s) return s(i, !0);
                        var p = new Error("Cannot find module '" + i + "'");
                        throw p.code = "MODULE_NOT_FOUND", p
                    }
                    var u = r[i] = {
                        exports: {}
                    };
                    e[i][0].call(u.exports, function (t) {
                        var r = e[i][1][t];
                        return o(r ? r : t)
                    }, u, u.exports, t, e, r, n)
                }
                return r[i].exports
            }
            for (var s = "function" == typeof require && require, i = 0; i < n.length; i++) o(n[i]);
            return o
        }({
            1: [function (e, t, r) {
                    t.exports = e("./lib/")
                }, {
                    "./lib/": 2
                }],
            2: [function (e, t, r) {
                    t.exports = e("./socket"), t.exports.parser = e("engine.io-parser")
                }, {
                    "./socket": 3,
                    "engine.io-parser": 20
                }],
            3: [function (e, t, r) {
                    (function (r) {
                        function n(e, t) {
                            if (!(this instanceof n)) return new n(e, t);
                            t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = u(e), t.hostname = e.host,
                                t.secure = "https" == e.protocol || "wss" == e.protocol, t.port = e.port, e.query && (t
                                .query = e.query)) : t.host && (t.hostname = u(t.host).host), this.secure = null != t.secure ?
                                t.secure : r.location && "https:" == location.protocol, t.hostname && !t.port && (t.port =
                                this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname ||
                                (r.location ? location.hostname : "localhost"), this.port = t.port || (r.location &&
                                location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {},
                                "string" == typeof this.query && (this.query = f.decode(this.query)), this.upgrade = !1 !==
                                t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!
                                t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !! t.forceBase64, this.enablesXDR = !!
                                t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t
                                .timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.readyState =
                                "", this.writeBuffer = [], this.policyPort = t.policyPort || 843, this.rememberUpgrade =
                                t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades,
                                this.perMessageDeflate = !1 !== t.perMessageDeflate ? t.perMessageDeflate || {} : !1, !
                                0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate &&
                                null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
                                this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase ||
                                null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers ||
                                null, this.rejectUnauthorized = void 0 === t.rejectUnauthorized ? null : t.rejectUnauthorized;
                            var o = "object" == typeof r && r;
                            o.global === o && t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders =
                                t.extraHeaders), this.open()
                        }
                        function o(e) {
                            var t = {};
                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                            return t
                        }
                        var s = e("./transports"),
                            i = e("component-emitter"),
                            a = e("debug")("engine.io-client:socket"),
                            c = e("indexof"),
                            p = e("engine.io-parser"),
                            u = e("parseuri"),
                            h = e("parsejson"),
                            f = e("parseqs");
                        t.exports = n, n.priorWebsocketSuccess = !1, i(n.prototype), n.protocol = p.protocol, n.Socket =
                            n, n.Transport = e("./transport"), n.transports = e("./transports"), n.parser = e(
                            "engine.io-parser"), n.prototype.createTransport = function (e) {
                            a('creating transport "%s"', e);
                            var t = o(this.query);
                            t.EIO = p.protocol, t.transport = e, this.id && (t.sid = this.id);
                            var r = new s[e]({
                                agent: this.agent,
                                hostname: this.hostname,
                                port: this.port,
                                secure: this.secure,
                                path: this.path,
                                query: t,
                                forceJSONP: this.forceJSONP,
                                jsonp: this.jsonp,
                                forceBase64: this.forceBase64,
                                enablesXDR: this.enablesXDR,
                                timestampRequests: this.timestampRequests,
                                timestampParam: this.timestampParam,
                                policyPort: this.policyPort,
                                socket: this,
                                pfx: this.pfx,
                                key: this.key,
                                passphrase: this.passphrase,
                                cert: this.cert,
                                ca: this.ca,
                                ciphers: this.ciphers,
                                rejectUnauthorized: this.rejectUnauthorized,
                                perMessageDeflate: this.perMessageDeflate,
                                extraHeaders: this.extraHeaders
                            });
                            return r
                        }, n.prototype.open = function () {
                            var e;
                            if (this.rememberUpgrade && n.priorWebsocketSuccess && -1 != this.transports.indexOf(
                                "websocket")) e = "websocket";
                            else {
                                if (0 === this.transports.length) {
                                    var t = this;
                                    return void setTimeout(function () {
                                        t.emit("error", "No transports available")
                                    }, 0)
                                }
                                e = this.transports[0]
                            }
                            this.readyState = "opening";
                            try {
                                e = this.createTransport(e)
                            } catch (r) {
                                return this.transports.shift(), void this.open()
                            }
                            e.open(), this.setTransport(e)
                        }, n.prototype.setTransport = function (e) {
                            a("setting transport %s", e.name);
                            var t = this;
                            this.transport && (a("clearing existing transport %s", this.transport.name), this.transport
                                .removeAllListeners()), this.transport = e, e.on("drain", function () {
                                t.onDrain()
                            }).on("packet", function (e) {
                                t.onPacket(e)
                            }).on("error", function (e) {
                                t.onError(e)
                            }).on("close", function () {
                                t.onClose("transport close")
                            })
                        }, n.prototype.probe = function (e) {
                            function t() {
                                if (f.onlyBinaryUpgrades) {
                                    var t = !this.supportsBinary && f.transport.supportsBinary;
                                    h = h || t
                                }
                                h || (a('probe transport "%s" opened', e), u.send([{
                                        type: "ping",
                                        data: "probe"
                                    }]), u.once("packet", function (t) {
                                    if (!h) if ("pong" == t.type && "probe" == t.data) {
                                            if (a('probe transport "%s" pong', e), f.upgrading = !0, f.emit("upgrading",
                                                u), !u) return;
                                            n.priorWebsocketSuccess = "websocket" == u.name, a(
                                                'pausing current transport "%s"', f.transport.name), f.transport.pause(function () {
                                                h || "closed" != f.readyState && (a(
                                                    "changing transport and sending upgrade packet"), p(), f.setTransport(
                                                    u), u.send([{
                                                        type: "upgrade"
                                                    }]), f.emit("upgrade", u), u = null, f.upgrading = !1, f.flush())
                                            })
                                        } else {
                                            a('probe transport "%s" failed', e);
                                            var r = new Error("probe error");
                                            r.transport = u.name, f.emit("upgradeError", r)
                                        }
                                }))
                            }
                            function r() {
                                h || (h = !0, p(), u.close(), u = null)
                            }
                            function o(t) {
                                var n = new Error("probe error: " + t);
                                n.transport = u.name, r(), a('probe transport "%s" failed because of error: %s', e, t),
                                    f.emit("upgradeError", n)
                            }
                            function s() {
                                o("transport closed")
                            }
                            function i() {
                                o("socket closed")
                            }
                            function c(e) {
                                u && e.name != u.name && (a('"%s" works - aborting "%s"', e.name, u.name), r())
                            }
                            function p() {
                                u.removeListener("open", t), u.removeListener("error", o), u.removeListener("close", s),
                                    f.removeListener("close", i), f.removeListener("upgrading", c)
                            }
                            a('probing transport "%s"', e);
                            var u = this.createTransport(e, {
                                probe: 1
                            }),
                                h = !1,
                                f = this;
                            n.priorWebsocketSuccess = !1, u.once("open", t), u.once("error", o), u.once("close", s),
                                this.once("close", i), this.once("upgrading", c), u.open()
                        }, n.prototype.onOpen = function () {
                            if (a("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" ==
                                this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this
                                .upgrade && this.transport.pause) {
                                a("starting upgrade probes");
                                for (var e = 0, t = this.upgrades.length; t > e; e++) this.probe(this.upgrades[e])
                            }
                        }, n.prototype.onPacket = function (e) {
                            if ("opening" == this.readyState || "open" == this.readyState) switch (a(
                                    'socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e),
                                    this.emit("heartbeat"), e.type) {
                                case "open":
                                    this.onHandshake(h(e.data));
                                    break;
                                case "pong":
                                    this.setPing(), this.emit("pong");
                                    break;
                                case "error":
                                    var t = new Error("server error");
                                    t.code = e.data, this.onError(t);
                                    break;
                                case "message":
                                    this.emit("data", e.data), this.emit("message", e.data)
                            } else a('packet received with socket readyState "%s"', this.readyState)
                        }, n.prototype.onHandshake = function (e) {
                            this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades =
                                this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout =
                                e.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener(
                                "heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                        }, n.prototype.onHeartbeat = function (e) {
                            clearTimeout(this.pingTimeoutTimer);
                            var t = this;
                            t.pingTimeoutTimer = setTimeout(function () {
                                "closed" != t.readyState && t.onClose("ping timeout")
                            }, e || t.pingInterval + t.pingTimeout)
                        }, n.prototype.setPing = function () {
                            var e = this;
                            clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function () {
                                a("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(
                                    e.pingTimeout)
                            }, e.pingInterval)
                        }, n.prototype.ping = function () {
                            var e = this;
                            this.sendPacket("ping", function () {
                                e.emit("ping")
                            })
                        }, n.prototype.onDrain = function () {
                            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer
                                .length ? this.emit("drain") : this.flush()
                        }, n.prototype.flush = function () {
                            "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer
                                .length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport
                                .send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit(
                                "flush"))
                        }, n.prototype.write = n.prototype.send = function (e, t, r) {
                            return this.sendPacket("message", e, t, r), this
                        }, n.prototype.sendPacket = function (e, t, r, n) {
                            if ("function" == typeof t && (n = t, t = void 0), "function" == typeof r && (n = r, r =
                                null), "closing" != this.readyState && "closed" != this.readyState) {
                                r = r || {}, r.compress = !1 !== r.compress;
                                var o = {
                                    type: e,
                                    data: t,
                                    options: r
                                };
                                this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n),
                                    this.flush()
                            }
                        }, n.prototype.close = function () {
                            function e() {
                                n.onClose("forced close"), a("socket closing - telling transport to close"), n.transport
                                    .close()
                            }
                            function t() {
                                n.removeListener("upgrade", t), n.removeListener("upgradeError", t), e()
                            }
                            function r() {
                                n.once("upgrade", t), n.once("upgradeError", t)
                            }
                            if ("opening" == this.readyState || "open" == this.readyState) {
                                this.readyState = "closing";
                                var n = this;
                                this.writeBuffer.length ? this.once("drain", function () {
                                    this.upgrading ? r() : e()
                                }) : this.upgrading ? r() : e()
                            }
                            return this
                        }, n.prototype.onError = function (e) {
                            a("socket error %j", e), n.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose(
                                "transport error", e)
                        }, n.prototype.onClose = function (e, t) {
                            if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                                a('socket close with reason: "%s"', e);
                                var r = this;
                                clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport
                                    .removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(),
                                    this.readyState = "closed", this.id = null, this.emit("close", e, t), r.writeBuffer = [],
                                    r.prevBufferLen = 0
                            }
                        }, n.prototype.filterUpgrades = function (e) {
                            for (var t = [], r = 0, n = e.length; n > r; r++)~ c(this.transports, e[r]) && t.push(e[r]);
                            return t
                        }
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    "./transport": 4,
                    "./transports": 5,
                    "component-emitter": 16,
                    debug: 18,
                    "engine.io-parser": 20,
                    indexof: 24,
                    parsejson: 27,
                    parseqs: 28,
                    parseuri: 29
                }],
            4: [function (e, t, r) {
                    function n(e) {
                        this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure,
                            this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests,
                            this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR =
                            e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert =
                            e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized,
                            this.extraHeaders = e.extraHeaders
                    }
                    var o = e("engine.io-parser"),
                        s = e("component-emitter");
                    t.exports = n, s(n.prototype), n.prototype.onError = function (e, t) {
                        var r = new Error(e);
                        return r.type = "TransportError", r.description = t, this.emit("error", r), this
                    }, n.prototype.open = function () {
                        return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening",
                            this.doOpen()), this
                    }, n.prototype.close = function () {
                        return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), this.onClose()),
                            this
                    }, n.prototype.send = function (e) {
                        if ("open" != this.readyState) throw new Error("Transport not open");
                        this.write(e)
                    }, n.prototype.onOpen = function () {
                        this.readyState = "open", this.writable = !0, this.emit("open")
                    }, n.prototype.onData = function (e) {
                        var t = o.decodePacket(e, this.socket.binaryType);
                        this.onPacket(t)
                    }, n.prototype.onPacket = function (e) {
                        this.emit("packet", e)
                    }, n.prototype.onClose = function () {
                        this.readyState = "closed", this.emit("close")
                    }
                }, {
                    "component-emitter": 16,
                    "engine.io-parser": 20
                }],
            5: [function (e, t, r) {
                    (function (t) {
                        function n(e) {
                            var r, n = !1,
                                a = !1,
                                c = !1 !== e.jsonp;
                            if (t.location) {
                                var p = "https:" == location.protocol,
                                    u = location.port;
                                u || (u = p ? 443 : 80), n = e.hostname != location.hostname || u != e.port, a = e.secure !=
                                    p
                            }
                            if (e.xdomain = n, e.xscheme = a, r = new o(e), "open" in r && !e.forceJSONP) return new s(
                                    e);
                            if (!c) throw new Error("JSONP disabled");
                            return new i(e)
                        }
                        var o = e("xmlhttprequest-ssl"),
                            s = e("./polling-xhr"),
                            i = e("./polling-jsonp"),
                            a = e("./websocket");
                        r.polling = n, r.websocket = a
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    "./polling-jsonp": 6,
                    "./polling-xhr": 7,
                    "./websocket": 9,
                    "xmlhttprequest-ssl": 10
                }],
            6: [function (e, t, r) {
                    (function (r) {
                        function n() {}
                        function o(e) {
                            s.call(this, e), this.query = this.query || {}, a || (r.___eio || (r.___eio = []), a = r.___eio),
                                this.index = a.length;
                            var t = this;
                            a.push(function (e) {
                                t.onData(e)
                            }), this.query.j = this.index, r.document && r.addEventListener && r.addEventListener(
                                "beforeunload", function () {
                                t.script && (t.script.onerror = n)
                            }, !1)
                        }
                        var s = e("./polling"),
                            i = e("component-inherit");
                        t.exports = o;
                        var a, c = /\n/g,
                            p = /\\n/g;
                        i(o, s), o.prototype.supportsBinary = !1, o.prototype.doClose = function () {
                            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form &&
                                (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), s.prototype
                                .doClose.call(this)
                        }, o.prototype.doPoll = function () {
                            var e = this,
                                t = document.createElement("script");
                            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !
                                0, t.src = this.uri(), t.onerror = function (t) {
                                e.onError("jsonp poll error", t)
                            };
                            var r = document.getElementsByTagName("script")[0];
                            r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t), this
                                .script = t;
                            var n = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                            n && setTimeout(function () {
                                var e = document.createElement("iframe");
                                document.body.appendChild(e), document.body.removeChild(e)
                            }, 100)
                        }, o.prototype.doWrite = function (e, t) {
                            function r() {
                                n(), t()
                            }
                            function n() {
                                if (o.iframe) try {
                                        o.form.removeChild(o.iframe)
                                } catch (e) {
                                    o.onError("jsonp polling iframe removal error", e)
                                }
                                try {
                                    var t = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                                    s = document.createElement(t)
                                } catch (e) {
                                    s = document.createElement("iframe"), s.name = o.iframeId, s.src = "javascript:0"
                                }
                                s.id = o.iframeId, o.form.appendChild(s), o.iframe = s
                            }
                            var o = this;
                            if (!this.form) {
                                var s, i = document.createElement("form"),
                                    a = document.createElement("textarea"),
                                    u = this.iframeId = "eio_iframe_" + this.index;
                                i.className = "socketio", i.style.position = "absolute", i.style.top = "-1000px", i.style
                                    .left = "-1000px", i.target = u, i.method = "POST", i.setAttribute("accept-charset",
                                    "utf-8"), a.name = "d", i.appendChild(a), document.body.appendChild(i), this.form =
                                    i, this.area = a
                            }
                            this.form.action = this.uri(), n(), e = e.replace(p, "\\\n"), this.area.value = e.replace(c,
                                "\\n");
                            try {
                                this.form.submit()
                            } catch (h) {}
                            this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                                "complete" == o.iframe.readyState && r()
                            } : this.iframe.onload = r
                        }
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    "./polling": 8,
                    "component-inherit": 17
                }],
            7: [function (e, t, r) {
                    (function (r) {
                        function n() {}
                        function o(e) {
                            if (c.call(this, e), r.location) {
                                var t = "https:" == location.protocol,
                                    n = location.port;
                                n || (n = t ? 443 : 80), this.xd = e.hostname != r.location.hostname || n != e.port,
                                    this.xs = e.secure != t
                            } else this.extraHeaders = e.extraHeaders
                        }
                        function s(e) {
                            this.method = e.method || "GET", this.uri = e.uri, this.xd = !! e.xd, this.xs = !! e.xs,
                                this.async = !1 !== e.async, this.data = void 0 != e.data ? e.data : null, this.agent =
                                e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR =
                                e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert =
                                e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized,
                                this.extraHeaders = e.extraHeaders, this.create()
                        }
                        function i() {
                            for (var e in s.requests) s.requests.hasOwnProperty(e) && s.requests[e].abort()
                        }
                        var a = e("xmlhttprequest-ssl"),
                            c = e("./polling"),
                            p = e("component-emitter"),
                            u = e("component-inherit"),
                            h = e("debug")("engine.io-client:polling-xhr");
                        t.exports = o, t.exports.Request = s, u(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function (
                            e) {
                            return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !
                                1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this
                                .pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this
                                .ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.extraHeaders =
                                this.extraHeaders, new s(e)
                        }, o.prototype.doWrite = function (e, t) {
                            var r = "string" != typeof e && void 0 !== e,
                                n = this.request({
                                    method: "POST",
                                    data: e,
                                    isBinary: r
                                }),
                                o = this;
                            n.on("success", t), n.on("error", function (e) {
                                o.onError("xhr post error", e)
                            }), this.sendXhr = n
                        }, o.prototype.doPoll = function () {
                            h("xhr poll");
                            var e = this.request(),
                                t = this;
                            e.on("data", function (e) {
                                t.onData(e)
                            }), e.on("error", function (e) {
                                t.onError("xhr poll error", e)
                            }), this.pollXhr = e
                        }, p(s.prototype), s.prototype.create = function () {
                            var e = {
                                agent: this.agent,
                                xdomain: this.xd,
                                xscheme: this.xs,
                                enablesXDR: this.enablesXDR
                            };
                            e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca =
                                this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
                            var t = this.xhr = new a(e),
                                n = this;
                            try {
                                h("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
                                try {
                                    if (this.extraHeaders) {
                                        t.setDisableHeaderCheck(!0);
                                        for (var o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(
                                                o, this.extraHeaders[o])
                                    }
                                } catch (i) {}
                                if (this.supportsBinary && (t.responseType = "arraybuffer"), "POST" == this.method) try {
                                        this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") :
                                            t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                } catch (i) {}
                                "withCredentials" in t && (t.withCredentials = !0), this.hasXDR() ? (t.onload = function () {
                                    n.onLoad()
                                }, t.onerror = function () {
                                    n.onError(t.responseText)
                                }) : t.onreadystatechange = function () {
                                    4 == t.readyState && (200 == t.status || 1223 == t.status ? n.onLoad() : setTimeout(function () {
                                        n.onError(t.status)
                                    }, 0))
                                }, h("xhr data %s", this.data), t.send(this.data)
                            } catch (i) {
                                return void setTimeout(function () {
                                    n.onError(i)
                                }, 0)
                            }
                            r.document && (this.index = s.requestsCount++, s.requests[this.index] = this)
                        }, s.prototype.onSuccess = function () {
                            this.emit("success"), this.cleanup()
                        }, s.prototype.onData = function (e) {
                            this.emit("data", e), this.onSuccess()
                        }, s.prototype.onError = function (e) {
                            this.emit("error", e), this.cleanup(!0)
                        }, s.prototype.cleanup = function (e) {
                            if ("undefined" != typeof this.xhr && null !== this.xhr) {
                                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange =
                                    n, e) try {
                                        this.xhr.abort()
                                } catch (t) {}
                                r.document && delete s.requests[this.index], this.xhr = null
                            }
                        }, s.prototype.onLoad = function () {
                            var e;
                            try {
                                var t;
                                try {
                                    t = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                                } catch (r) {}
                                if ("application/octet-stream" === t) e = this.xhr.response;
                                else if (this.supportsBinary) try {
                                        e = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                                } catch (r) {
                                    for (var n = new Uint8Array(this.xhr.response), o = [], s = 0, i = n.length; i > s; s++)
                                        o.push(n[s]);
                                    e = String.fromCharCode.apply(null, o)
                                } else e = this.xhr.responseText
                            } catch (r) {
                                this.onError(r)
                            }
                            null != e && this.onData(e)
                        }, s.prototype.hasXDR = function () {
                            return "undefined" != typeof r.XDomainRequest && !this.xs && this.enablesXDR
                        }, s.prototype.abort = function () {
                            this.cleanup()
                        }, r.document && (s.requestsCount = 0, s.requests = {}, r.attachEvent ? r.attachEvent(
                            "onunload", i) : r.addEventListener && r.addEventListener("beforeunload", i, !1))
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    "./polling": 8,
                    "component-emitter": 16,
                    "component-inherit": 17,
                    debug: 18,
                    "xmlhttprequest-ssl": 10
                }],
            8: [function (e, t, r) {
                    function n(e) {
                        var t = e && e.forceBase64;
                        (!u || t) && (this.supportsBinary = !1), o.call(this, e)
                    }
                    var o = e("../transport"),
                        s = e("parseqs"),
                        i = e("engine.io-parser"),
                        a = e("component-inherit"),
                        c = e("yeast"),
                        p = e("debug")("engine.io-client:polling");
                    t.exports = n;
                    var u = function () {
                        var t = e("xmlhttprequest-ssl"),
                            r = new t({
                                xdomain: !1
                            });
                        return null != r.responseType
                    }();
                    a(n, o), n.prototype.name = "polling", n.prototype.doOpen = function () {
                        this.poll()
                    }, n.prototype.pause = function (e) {
                        function t() {
                            p("paused"), r.readyState = "paused", e()
                        }
                        var r = this;
                        if (this.readyState = "pausing", this.polling || !this.writable) {
                            var n = 0;
                            this.polling && (p("we are currently polling - waiting to pause"), n++, this.once(
                                "pollComplete", function () {
                                p("pre-pause polling complete"), --n || t()
                            })), this.writable || (p("we are currently writing - waiting to pause"), n++, this.once(
                                "drain", function () {
                                p("pre-pause writing complete"), --n || t()
                            }))
                        } else t()
                    }, n.prototype.poll = function () {
                        p("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
                    }, n.prototype.onData = function (e) {
                        var t = this;
                        p("polling got data %s", e);
                        var r = function (e, r, n) {
                            return "opening" == t.readyState && t.onOpen(), "close" == e.type ? (t.onClose(), !1) :
                                void t.onPacket(e)
                        };
                        i.decodePayload(e, this.socket.binaryType, r), "closed" != this.readyState && (this.polling = !
                            1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : p(
                            'ignoring poll - transport state "%s"', this.readyState))
                    }, n.prototype.doClose = function () {
                        function e() {
                            p("writing close packet"), t.write([{
                                    type: "close"
                                }])
                        }
                        var t = this;
                        "open" == this.readyState ? (p("transport open - closing"), e()) : (p(
                            "transport not open - deferring close"), this.once("open", e))
                    }, n.prototype.write = function (e) {
                        var t = this;
                        this.writable = !1;
                        var r = function () {
                            t.writable = !0, t.emit("drain")
                        }, t = this;
                        i.encodePayload(e, this.supportsBinary, function (e) {
                            t.doWrite(e, r)
                        })
                    }, n.prototype.uri = function () {
                        var e = this.query || {}, t = this.secure ? "https" : "http",
                            r = "";
                        !1 !== this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary || e.sid ||
                            (e.b64 = 1), e = s.encode(e), this.port && ("https" == t && 443 != this.port || "http" == t &&
                            80 != this.port) && (r = ":" + this.port), e.length && (e = "?" + e);
                        var n = -1 !== this.hostname.indexOf(":");
                        return t + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
                    }
                }, {
                    "../transport": 4,
                    "component-inherit": 17,
                    debug: 18,
                    "engine.io-parser": 20,
                    parseqs: 28,
                    "xmlhttprequest-ssl": 10,
                    yeast: 31
                }],
            9: [function (e, t, r) {
                    (function (r) {
                        function n(e) {
                            var t = e && e.forceBase64;
                            t && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, o.call(this,
                                e)
                        }
                        var o = e("../transport"),
                            s = e("engine.io-parser"),
                            i = e("parseqs"),
                            a = e("component-inherit"),
                            c = e("yeast"),
                            p = e("debug")("engine.io-client:websocket"),
                            u = r.WebSocket || r.MozWebSocket,
                            h = u;
                        if (!h && "undefined" == typeof window) try {
                                h = e("ws")
                        } catch (f) {}
                        t.exports = n, a(n, o), n.prototype.name = "websocket", n.prototype.supportsBinary = !0, n.prototype
                            .doOpen = function () {
                            if (this.check()) {
                                var e = this.uri(),
                                    t = void 0,
                                    r = {
                                        agent: this.agent,
                                        perMessageDeflate: this.perMessageDeflate
                                    };
                                r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert,
                                    r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized,
                                    this.extraHeaders && (r.headers = this.extraHeaders), this.ws = u ? new h(e) : new h(
                                    e, t, r), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports &&
                                    this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") :
                                    this.ws.binaryType = "arraybuffer", this.addEventListeners()
                            }
                        }, n.prototype.addEventListeners = function () {
                            var e = this;
                            this.ws.onopen = function () {
                                e.onOpen()
                            }, this.ws.onclose = function () {
                                e.onClose()
                            }, this.ws.onmessage = function (t) {
                                e.onData(t.data)
                            }, this.ws.onerror = function (t) {
                                e.onError("websocket error", t)
                            }
                        }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (n.prototype
                            .onData = function (e) {
                            var t = this;
                            setTimeout(function () {
                                o.prototype.onData.call(t, e)
                            }, 0)
                        }), n.prototype.write = function (e) {
                            function t() {
                                n.emit("flush"), setTimeout(function () {
                                    n.writable = !0, n.emit("drain")
                                }, 0)
                            }
                            var n = this;
                            this.writable = !1;
                            for (var o = e.length, i = 0, a = o; a > i; i++)! function (e) {
                                s.encodePacket(e, n.supportsBinary, function (s) {
                                    if (!u) {
                                        var i = {};
                                        if (e.options && (i.compress = e.options.compress), n.perMessageDeflate) {
                                            var a = "string" == typeof s ? r.Buffer.byteLength(s) : s.length;
                                            a < n.perMessageDeflate.threshold && (i.compress = !1)
                                        }
                                    }
                                    try {
                                        u ? n.ws.send(s) : n.ws.send(s, i)
                                    } catch (c) {
                                        p("websocket closed before onclose event")
                                    }--o || t()
                                })
                            }(e[i])
                        }, n.prototype.onClose = function () {
                            o.prototype.onClose.call(this)
                        }, n.prototype.doClose = function () {
                            "undefined" != typeof this.ws && this.ws.close()
                        }, n.prototype.uri = function () {
                            var e = this.query || {}, t = this.secure ? "wss" : "ws",
                                r = "";
                            this.port && ("wss" == t && 443 != this.port || "ws" == t && 80 != this.port) && (r = ":" +
                                this.port), this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary ||
                                (e.b64 = 1), e = i.encode(e), e.length && (e = "?" + e);
                            var n = -1 !== this.hostname.indexOf(":");
                            return t + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
                        }, n.prototype.check = function () {
                            return !(!h || "__initialize" in h && this.name === n.prototype.name)
                        }
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    "../transport": 4,
                    "component-inherit": 17,
                    debug: 18,
                    "engine.io-parser": 20,
                    parseqs: 28,
                    ws: 15,
                    yeast: 31
                }],
            10: [function (e, t, r) {
                    var n = e("has-cors");
                    t.exports = function (e) {
                        var t = e.xdomain,
                            r = e.xscheme,
                            o = e.enablesXDR;
                        try {
                            if ("undefined" != typeof XMLHttpRequest && (!t || n)) return new XMLHttpRequest
                        } catch (s) {}
                        try {
                            if ("undefined" != typeof XDomainRequest && !r && o) return new XDomainRequest
                        } catch (s) {}
                        if (!t) try {
                                return new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (s) {}
                    }
                }, {
                    "has-cors": 23
                }],
            11: [function (e, t, r) {
                    function n(e, t, r) {
                        function n(e, o) {
                            if (n.count <= 0) throw new Error("after called too many times");
                            --n.count, e ? (s = !0, t(e), t = r) : 0 !== n.count || s || t(null, o)
                        }
                        var s = !1;
                        return r = r || o, n.count = e, 0 === e ? t() : n
                    }
                    function o() {}
                    t.exports = n
                }, {}],
            12: [function (e, t, r) {
                    t.exports = function (e, t, r) {
                        var n = e.byteLength;
                        if (t = t || 0, r = r || n, e.slice) return e.slice(t, r);
                        if (0 > t && (t += n), 0 > r && (r += n), r > n && (r = n), t >= n || t >= r || 0 === n) return new ArrayBuffer(
                                0);
                        for (var o = new Uint8Array(e), s = new Uint8Array(r - t), i = t, a = 0; r > i; i++, a++) s[a] =
                                o[i];
                        return s.buffer
                    }
                }, {}],
            13: [function (e, t, r) {
                    ! function (e) {
                        "use strict";
                        r.encode = function (t) {
                            var r, n = new Uint8Array(t),
                                o = n.length,
                                s = "";
                            for (r = 0; o > r; r += 3) s += e[n[r] >> 2], s += e[(3 & n[r]) << 4 | n[r + 1] >> 4], s +=
                                    e[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], s += e[63 & n[r + 2]];
                            return o % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 === 1 && (s = s.substring(
                                0, s.length - 2) + "=="), s
                        }, r.decode = function (t) {
                            var r, n, o, s, i, a = .75 * t.length,
                                c = t.length,
                                p = 0;
                            "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
                            var u = new ArrayBuffer(a),
                                h = new Uint8Array(u);
                            for (r = 0; c > r; r += 4) n = e.indexOf(t[r]), o = e.indexOf(t[r + 1]), s = e.indexOf(t[r +
                                    2]), i = e.indexOf(t[r + 3]), h[p++] = n << 2 | o >> 4, h[p++] = (15 & o) << 4 | s >>
                                    2, h[p++] = (3 & s) << 6 | 63 & i;
                            return u
                        }
                    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
                }, {}],
            14: [function (e, t, r) {
                    (function (e) {
                        function r(e) {
                            for (var t = 0; t < e.length; t++) {
                                var r = e[t];
                                if (r.buffer instanceof ArrayBuffer) {
                                    var n = r.buffer;
                                    if (r.byteLength !== n.byteLength) {
                                        var o = new Uint8Array(r.byteLength);
                                        o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer
                                    }
                                    e[t] = n
                                }
                            }
                        }
                        function n(e, t) {
                            t = t || {};
                            var n = new s;
                            r(e);
                            for (var o = 0; o < e.length; o++) n.append(e[o]);
                            return t.type ? n.getBlob(t.type) : n.getBlob()
                        }
                        function o(e, t) {
                            return r(e), new Blob(e, t || {})
                        }
                        var s = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                            i = function () {
                                try {
                                    var e = new Blob(["hi"]);
                                    return 2 === e.size
                                } catch (t) {
                                    return !1
                                }
                            }(),
                            a = i && function () {
                                try {
                                    var e = new Blob([new Uint8Array([1, 2])]);
                                    return 2 === e.size
                                } catch (t) {
                                    return !1
                                }
                            }(),
                            c = s && s.prototype.append && s.prototype.getBlob;
                        t.exports = function () {
                            return i ? a ? e.Blob : o : c ? n : void 0
                        }()
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {}],
            15: [function (e, t, r) {}, {}],
            16: [function (e, t, r) {
                    function n(e) {
                        return e ? o(e) : void 0
                    }
                    function o(e) {
                        for (var t in n.prototype) e[t] = n.prototype[t];
                        return e
                    }
                    t.exports = n, n.prototype.on = n.prototype.addEventListener = function (e, t) {
                        return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || [])
                            .push(t), this
                    }, n.prototype.once = function (e, t) {
                        function r() {
                            n.off(e, r), t.apply(this, arguments)
                        }
                        var n = this;
                        return this._callbacks = this._callbacks || {}, r.fn = t, this.on(e, r), this
                    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (
                        e, t) {
                        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {},
                                this;
                        var r = this._callbacks[e];
                        if (!r) return this;
                        if (1 == arguments.length) return delete this._callbacks[e], this;
                        for (var n, o = 0; o < r.length; o++) if (n = r[o], n === t || n.fn === t) {
                                r.splice(o, 1);
                                break
                            }
                        return this
                    }, n.prototype.emit = function (e) {
                        this._callbacks = this._callbacks || {};
                        var t = [].slice.call(arguments, 1),
                            r = this._callbacks[e];
                        if (r) {
                            r = r.slice(0);
                            for (var n = 0, o = r.length; o > n; ++n) r[n].apply(this, t)
                        }
                        return this
                    }, n.prototype.listeners = function (e) {
                        return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
                    }, n.prototype.hasListeners = function (e) {
                        return !!this.listeners(e).length
                    }
                }, {}],
            17: [function (e, t, r) {
                    t.exports = function (e, t) {
                        var r = function () {};
                        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                    }
                }, {}],
            18: [function (e, t, r) {
                    function n() {
                        return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug ||
                            console.exception && console.table) || navigator.userAgent.toLowerCase().match(
                            /firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                    }
                    function o() {
                        var e = arguments,
                            t = this.useColors;
                        if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") +
                            "+" + r.humanize(this.diff), !t) return e;
                        var n = "color: " + this.color;
                        e = [e[0], n, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                        var o = 0,
                            s = 0;
                        return e[0].replace(/%[a-z%]/g, function (e) {
                            "%%" !== e && (o++, "%c" === e && (s = o))
                        }), e.splice(s, 0, n), e
                    }
                    function s() {
                        return "object" == typeof console && console.log && Function.prototype.apply.call(console.log,
                            console, arguments)
                    }
                    function i(e) {
                        try {
                            null == e ? r.storage.removeItem("debug") : r.storage.debug = e
                        } catch (t) {}
                    }
                    function a() {
                        var e;
                        try {
                            e = r.storage.debug
                        } catch (t) {}
                        return e
                    }
                    function c() {
                        try {
                            return window.localStorage
                        } catch (e) {}
                    }
                    r = t.exports = e("./debug"), r.log = s, r.formatArgs = o, r.save = i, r.load = a, r.useColors = n,
                        r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage
                        .local : c(), r.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue",
                            "darkorchid", "crimson"], r.formatters.j = function (e) {
                        return JSON.stringify(e)
                    }, r.enable(a())
                }, {
                    "./debug": 19
                }],
            19: [function (e, t, r) {
                    function n() {
                        return r.colors[u++ % r.colors.length]
                    }
                    function o(e) {
                        function t() {}
                        function o() {
                            var e = o,
                                t = +new Date,
                                s = t - (p || t);
                            e.diff = s, e.prev = p, e.curr = t, p = t, null == e.useColors && (e.useColors = r.useColors()),
                                null == e.color && e.useColors && (e.color = n());
                            var i = Array.prototype.slice.call(arguments);
                            i[0] = r.coerce(i[0]), "string" != typeof i[0] && (i = ["%o"].concat(i));
                            var a = 0;
                            i[0] = i[0].replace(/%([a-z%])/g, function (t, n) {
                                if ("%%" === t) return t;
                                a++;
                                var o = r.formatters[n];
                                if ("function" == typeof o) {
                                    var s = i[a];
                                    t = o.call(e, s), i.splice(a, 1), a--
                                }
                                return t
                            }), "function" == typeof r.formatArgs && (i = r.formatArgs.apply(e, i));
                            var c = o.log || r.log || console.log.bind(console);
                            c.apply(e, i)
                        }
                        t.enabled = !1, o.enabled = !0;
                        var s = r.enabled(e) ? o : t;
                        return s.namespace = e, s
                    }
                    function s(e) {
                        r.save(e);
                        for (var t = (e || "").split(/[\s,]+/), n = t.length, o = 0; n > o; o++) t[o] && (e = t[o].replace(
                                /\*/g, ".*?"), "-" === e[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names
                                .push(new RegExp("^" + e + "$")))
                    }
                    function i() {
                        r.enable("")
                    }
                    function a(e) {
                        var t, n;
                        for (t = 0, n = r.skips.length; n > t; t++) if (r.skips[t].test(e)) return !1;
                        for (t = 0, n = r.names.length; n > t; t++) if (r.names[t].test(e)) return !0;
                        return !1
                    }
                    function c(e) {
                        return e instanceof Error ? e.stack || e.message : e
                    }
                    r = t.exports = o, r.coerce = c, r.disable = i, r.enable = s, r.enabled = a, r.humanize = e("ms"),
                        r.names = [], r.skips = [], r.formatters = {};
                    var p, u = 0
                }, {
                    ms: 26
                }],
            20: [function (e, t, r) {
                    (function (t) {
                        function n(e, t) {
                            var n = "b" + r.packets[e.type] + e.data.data;
                            return t(n)
                        }
                        function o(e, t, n) {
                            if (!t) return r.encodeBase64Packet(e, n);
                            var o = e.data,
                                s = new Uint8Array(o),
                                i = new Uint8Array(1 + o.byteLength);
                            i[0] = m[e.type];
                            for (var a = 0; a < s.length; a++) i[a + 1] = s[a];
                            return n(i.buffer)
                        }
                        function s(e, t, n) {
                            if (!t) return r.encodeBase64Packet(e, n);
                            var o = new FileReader;
                            return o.onload = function () {
                                e.data = o.result, r.encodePacket(e, t, !0, n)
                            }, o.readAsArrayBuffer(e.data)
                        }
                        function i(e, t, n) {
                            if (!t) return r.encodeBase64Packet(e, n);
                            if (g) return s(e, t, n);
                            var o = new Uint8Array(1);
                            o[0] = m[e.type];
                            var i = new w([o.buffer, e.data]);
                            return n(i)
                        }
                        function a(e, t, r) {
                            for (var n = new Array(e.length), o = f(e.length, r), s = function (e, r, o) {
                                    t(r, function (t, r) {
                                        n[e] = r, o(t, n)
                                    })
                                }, i = 0; i < e.length; i++) s(i, e[i], o)
                        }
                        var c = e("./keys"),
                            p = e("has-binary"),
                            u = e("arraybuffer.slice"),
                            h = e("base64-arraybuffer"),
                            f = e("after"),
                            l = e("utf8"),
                            d = navigator.userAgent.match(/Android/i),
                            y = /PhantomJS/i.test(navigator.userAgent),
                            g = d || y;
                        r.protocol = 3;
                        var m = r.packets = {
                            open: 0,
                            close: 1,
                            ping: 2,
                            pong: 3,
                            message: 4,
                            upgrade: 5,
                            noop: 6
                        }, v = c(m),
                            b = {
                                type: "error",
                                data: "parser error"
                            }, w = e("blob");
                        r.encodePacket = function (e, r, s, a) {
                            "function" == typeof r && (a = r, r = !1), "function" == typeof s && (a = s, s = null);
                            var c = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                            if (t.ArrayBuffer && c instanceof ArrayBuffer) return o(e, r, a);
                            if (w && c instanceof t.Blob) return i(e, r, a);
                            if (c && c.base64) return n(e, a);
                            var p = m[e.type];
                            return void 0 !== e.data && (p += s ? l.encode(String(e.data)) : String(e.data)), a("" + p)
                        }, r.encodeBase64Packet = function (e, n) {
                            var o = "b" + r.packets[e.type];
                            if (w && e.data instanceof t.Blob) {
                                var s = new FileReader;
                                return s.onload = function () {
                                    var e = s.result.split(",")[1];
                                    n(o + e)
                                }, s.readAsDataURL(e.data)
                            }
                            var i;
                            try {
                                i = String.fromCharCode.apply(null, new Uint8Array(e.data))
                            } catch (a) {
                                for (var c = new Uint8Array(e.data), p = new Array(c.length), u = 0; u < c.length; u++)
                                    p[u] = c[u];
                                i = String.fromCharCode.apply(null, p)
                            }
                            return o += t.btoa(i), n(o)
                        }, r.decodePacket = function (e, t, n) {
                            if ("string" == typeof e || void 0 === e) {
                                if ("b" == e.charAt(0)) return r.decodeBase64Packet(e.substr(1), t);
                                if (n) try {
                                        e = l.decode(e)
                                } catch (o) {
                                    return b
                                }
                                var s = e.charAt(0);
                                return Number(s) == s && v[s] ? e.length > 1 ? {
                                    type: v[s],
                                    data: e.substring(1)
                                } : {
                                    type: v[s]
                                } : b
                            }
                            var i = new Uint8Array(e),
                                s = i[0],
                                a = u(e, 1);
                            return w && "blob" === t && (a = new w([a])), {
                                type: v[s],
                                data: a
                            }
                        }, r.decodeBase64Packet = function (e, r) {
                            var n = v[e.charAt(0)];
                            if (!t.ArrayBuffer) return {
                                    type: n,
                                    data: {
                                        base64: !0,
                                        data: e.substr(1)
                                    }
                            };
                            var o = h.decode(e.substr(1));
                            return "blob" === r && w && (o = new w([o])), {
                                type: n,
                                data: o
                            }
                        }, r.encodePayload = function (e, t, n) {
                            function o(e) {
                                return e.length + ":" + e
                            }
                            function s(e, n) {
                                r.encodePacket(e, i ? t : !1, !0, function (e) {
                                    n(null, o(e))
                                })
                            }
                            "function" == typeof t && (n = t, t = null);
                            var i = p(e);
                            return t && i ? w && !g ? r.encodePayloadAsBlob(e, n) : r.encodePayloadAsArrayBuffer(e, n) :
                                e.length ? void a(e, s, function (e, t) {
                                return n(t.join(""))
                            }) : n("0:")
                        }, r.decodePayload = function (e, t, n) {
                            if ("string" != typeof e) return r.decodePayloadAsBinary(e, t, n);
                            "function" == typeof t && (n = t, t = null);
                            var o;
                            if ("" == e) return n(b, 0, 1);
                            for (var s, i, a = "", c = 0, p = e.length; p > c; c++) {
                                var u = e.charAt(c);
                                if (":" != u) a += u;
                                else {
                                    if ("" == a || a != (s = Number(a))) return n(b, 0, 1);
                                    if (i = e.substr(c + 1, s), a != i.length) return n(b, 0, 1);
                                    if (i.length) {
                                        if (o = r.decodePacket(i, t, !0), b.type == o.type && b.data == o.data) return n(
                                                b, 0, 1);
                                        var h = n(o, c + s, p);
                                        if (!1 === h) return
                                    }
                                    c += s, a = ""
                                }
                            }
                            return "" != a ? n(b, 0, 1) : void 0
                        }, r.encodePayloadAsArrayBuffer = function (e, t) {
                            function n(e, t) {
                                r.encodePacket(e, !0, !0, function (e) {
                                    return t(null, e)
                                })
                            }
                            return e.length ? void a(e, n, function (e, r) {
                                var n = r.reduce(function (e, t) {
                                    var r;
                                    return r = "string" == typeof t ? t.length : t.byteLength, e + r.toString().length +
                                        r + 2
                                }, 0),
                                    o = new Uint8Array(n),
                                    s = 0;
                                return r.forEach(function (e) {
                                    var t = "string" == typeof e,
                                        r = e;
                                    if (t) {
                                        for (var n = new Uint8Array(e.length), i = 0; i < e.length; i++) n[i] = e.charCodeAt(
                                                i);
                                        r = n.buffer
                                    }
                                    t ? o[s++] = 0 : o[s++] = 1;
                                    for (var a = r.byteLength.toString(), i = 0; i < a.length; i++) o[s++] = parseInt(a[
                                            i]);
                                    o[s++] = 255;
                                    for (var n = new Uint8Array(r), i = 0; i < n.length; i++) o[s++] = n[i]
                                }), t(o.buffer)
                            }) : t(new ArrayBuffer(0))
                        }, r.encodePayloadAsBlob = function (e, t) {
                            function n(e, t) {
                                r.encodePacket(e, !0, !0, function (e) {
                                    var r = new Uint8Array(1);
                                    if (r[0] = 1, "string" == typeof e) {
                                        for (var n = new Uint8Array(e.length), o = 0; o < e.length; o++) n[o] = e.charCodeAt(
                                                o);
                                        e = n.buffer, r[0] = 0
                                    }
                                    for (var s = e instanceof ArrayBuffer ? e.byteLength : e.size, i = s.toString(), a =
                                            new Uint8Array(i.length + 1), o = 0; o < i.length; o++) a[o] = parseInt(i[o]);
                                    if (a[i.length] = 255, w) {
                                        var c = new w([r.buffer, a.buffer, e]);
                                        t(null, c)
                                    }
                                })
                            }
                            a(e, n, function (e, r) {
                                return t(new w(r))
                            })
                        }, r.decodePayloadAsBinary = function (e, t, n) {
                            "function" == typeof t && (n = t, t = null);
                            for (var o = e, s = [], i = !1; o.byteLength > 0;) {
                                for (var a = new Uint8Array(o), c = 0 === a[0], p = "", h = 1; 255 != a[h]; h++) {
                                    if (p.length > 310) {
                                        i = !0;
                                        break
                                    }
                                    p += a[h]
                                }
                                if (i) return n(b, 0, 1);
                                o = u(o, 2 + p.length), p = parseInt(p);
                                var f = u(o, 0, p);
                                if (c) try {
                                        f = String.fromCharCode.apply(null, new Uint8Array(f))
                                } catch (l) {
                                    var d = new Uint8Array(f);
                                    f = "";
                                    for (var h = 0; h < d.length; h++) f += String.fromCharCode(d[h])
                                }
                                s.push(f), o = u(o, p)
                            }
                            var y = s.length;
                            s.forEach(function (e, o) {
                                n(r.decodePacket(e, t, !0), o, y)
                            })
                        }
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    "./keys": 21,
                    after: 11,
                    "arraybuffer.slice": 12,
                    "base64-arraybuffer": 13,
                    blob: 14,
                    "has-binary": 22,
                    utf8: 30
                }],
            21: [function (e, t, r) {
                    t.exports = Object.keys || function (e) {
                        var t = [],
                            r = Object.prototype.hasOwnProperty;
                        for (var n in e) r.call(e, n) && t.push(n);
                        return t
                    }
                }, {}],
            22: [function (e, t, r) {
                    (function (r) {
                        function n(e) {
                            function t(e) {
                                if (!e) return !1;
                                if (r.Buffer && r.Buffer.isBuffer(e) || r.ArrayBuffer && e instanceof ArrayBuffer || r.Blob &&
                                    e instanceof Blob || r.File && e instanceof File) return !0;
                                if (o(e)) {
                                    for (var n = 0; n < e.length; n++) if (t(e[n])) return !0
                                } else if (e && "object" == typeof e) {
                                    e.toJSON && (e = e.toJSON());
                                    for (var s in e) if (Object.prototype.hasOwnProperty.call(e, s) && t(e[s])) return !
                                                0
                                }
                                return !1
                            }
                            return t(e)
                        }
                        var o = e("isarray");
                        t.exports = n
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {
                    isarray: 25
                }],
            23: [function (e, t, r) {
                    try {
                        t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                    } catch (n) {
                        t.exports = !1
                    }
                }, {}],
            24: [function (e, t, r) {
                    var n = [].indexOf;
                    t.exports = function (e, t) {
                        if (n) return e.indexOf(t);
                        for (var r = 0; r < e.length; ++r) if (e[r] === t) return r;
                        return -1
                    }
                }, {}],
            25: [function (e, t, r) {
                    t.exports = Array.isArray || function (e) {
                        return "[object Array]" == Object.prototype.toString.call(e)
                    }
                }, {}],
            26: [function (e, t, r) {
                    function n(e) {
                        if (e = "" + e, !(e.length > 1e4)) {
                            var t =
                                /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i
                                .exec(e);
                            if (t) {
                                var r = parseFloat(t[1]),
                                    n = (t[2] || "ms").toLowerCase();
                                switch (n) {
                                case "years":
                                case "year":
                                case "yrs":
                                case "yr":
                                case "y":
                                    return r * h;
                                case "days":
                                case "day":
                                case "d":
                                    return r * u;
                                case "hours":
                                case "hour":
                                case "hrs":
                                case "hr":
                                case "h":
                                    return r * p;
                                case "minutes":
                                case "minute":
                                case "mins":
                                case "min":
                                case "m":
                                    return r * c;
                                case "seconds":
                                case "second":
                                case "secs":
                                case "sec":
                                case "s":
                                    return r * a;
                                case "milliseconds":
                                case "millisecond":
                                case "msecs":
                                case "msec":
                                case "ms":
                                    return r
                                }
                            }
                        }
                    }
                    function o(e) {
                        return e >= u ? Math.round(e / u) + "d" : e >= p ? Math.round(e / p) + "h" : e >= c ? Math.round(
                            e / c) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
                    }
                    function s(e) {
                        return i(e, u, "day") || i(e, p, "hour") || i(e, c, "minute") || i(e, a, "second") || e + " ms"
                    }
                    function i(e, t, r) {
                        return t > e ? void 0 : 1.5 * t > e ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r +
                            "s"
                    }
                    var a = 1e3,
                        c = 60 * a,
                        p = 60 * c,
                        u = 24 * p,
                        h = 365.25 * u;
                    t.exports = function (e, t) {
                        return t = t || {}, "string" == typeof e ? n(e) : t["long"] ? s(e) : o(e)
                    }
                }, {}],
            27: [function (e, t, r) {
                    (function (e) {
                        var r = /^[\],:{}\s]*$/,
                            n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                            o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                            s = /(?:^|:|,)(?:\s*\[)+/g,
                            i = /^\s+/,
                            a = /\s+$/;
                        t.exports = function (t) {
                            return "string" == typeof t && t ? (t = t.replace(i, "").replace(a, ""), e.JSON && JSON.parse ?
                                JSON.parse(t) : r.test(t.replace(n, "@").replace(o, "]").replace(s, "")) ? new Function(
                                "return " + t)() : void 0) : null
                        }
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {}],
            28: [function (e, t, r) {
                    r.encode = function (e) {
                        var t = "";
                        for (var r in e) e.hasOwnProperty(r) && (t.length && (t += "&"), t += encodeURIComponent(r) +
                                "=" + encodeURIComponent(e[r]));
                        return t
                    }, r.decode = function (e) {
                        for (var t = {}, r = e.split("&"), n = 0, o = r.length; o > n; n++) {
                            var s = r[n].split("=");
                            t[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
                        }
                        return t
                    }
                }, {}],
            29: [function (e, t, r) {
                    var n =
                        /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port",
                                "relative", "path", "directory", "file", "query", "anchor"];
                    t.exports = function (e) {
                        var t = e,
                            r = e.indexOf("["),
                            s = e.indexOf("]"); - 1 != r && -1 != s && (e = e.substring(0, r) + e.substring(r, s).replace(
                            /:/g, ";") + e.substring(s, e.length));
                        for (var i = n.exec(e || ""), a = {}, c = 14; c--;) a[o[c]] = i[c] || "";
                        return -1 != r && -1 != s && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(
                            /;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
                            a.ipv6uri = !0), a
                    }
                }, {}],
            30: [function (t, r, n) {
                    (function (t) {
                        ! function (o) {
                            function s(e) {
                                for (var t, r, n = [], o = 0, s = e.length; s > o;) t = e.charCodeAt(o++), t >= 55296 &&
                                        56319 >= t && s > o ? (r = e.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((
                                        1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), o--)) : n.push(t);
                                return n
                            }
                            function i(e) {
                                for (var t, r = e.length, n = -1, o = ""; ++n < r;) t = e[n], t > 65535 && (t -= 65536,
                                        o += w(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += w(t);
                                return o
                            }
                            function a(e) {
                                if (e >= 55296 && 57343 >= e) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() +
                                        " is not a scalar value")
                            }
                            function c(e, t) {
                                return w(e >> t & 63 | 128)
                            }
                            function p(e) {
                                if (0 == (4294967168 & e)) return w(e);
                                var t = "";
                                return 0 == (4294965248 & e) ? t = w(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (a(e),
                                    t = w(e >> 12 & 15 | 224), t += c(e, 6)) : 0 == (4292870144 & e) && (t = w(e >> 18 &
                                    7 | 240), t += c(e, 12), t += c(e, 6)), t += w(63 & e | 128)
                            }
                            function u(e) {
                                for (var t, r = s(e), n = r.length, o = -1, i = ""; ++o < n;) t = r[o], i += p(t);
                                return i
                            }
                            function h() {
                                if (b >= v) throw Error("Invalid byte index");
                                var e = 255 & m[b];
                                if (b++, 128 == (192 & e)) return 63 & e;
                                throw Error("Invalid continuation byte")
                            }
                            function f() {
                                var e, t, r, n, o;
                                if (b > v) throw Error("Invalid byte index");
                                if (b == v) return !1;
                                if (e = 255 & m[b], b++, 0 == (128 & e)) return e;
                                if (192 == (224 & e)) {
                                    var t = h();
                                    if (o = (31 & e) << 6 | t, o >= 128) return o;
                                    throw Error("Invalid continuation byte")
                                }
                                if (224 == (240 & e)) {
                                    if (t = h(), r = h(), o = (15 & e) << 12 | t << 6 | r, o >= 2048) return a(o), o;
                                    throw Error("Invalid continuation byte")
                                }
                                if (240 == (248 & e) && (t = h(), r = h(), n = h(), o = (15 & e) << 18 | t << 12 | r <<
                                    6 | n, o >= 65536 && 1114111 >= o)) return o;
                                throw Error("Invalid UTF-8 detected")
                            }
                            function l(e) {
                                m = s(e), v = m.length, b = 0;
                                for (var t, r = [];
                                (t = f()) !== !1;) r.push(t);
                                return i(r)
                            }
                            var d = "object" == typeof n && n,
                                y = "object" == typeof r && r && r.exports == d && r,
                                g = "object" == typeof t && t;
                            (g.global === g || g.window === g) && (o = g);
                            var m, v, b, w = String.fromCharCode,
                                x = {
                                    version: "2.0.0",
                                    encode: u,
                                    decode: l
                                };
                            if ("function" == typeof e && "object" == typeof e.amd && e.amd) e(function () {
                                    return x
                                });
                            else if (d && !d.nodeType) if (y) y.exports = x;
                                else {
                                    var k = {}, B = k.hasOwnProperty;
                                    for (var S in x) B.call(x, S) && (d[S] = x[S])
                                } else o.utf8 = x
                        }(this)
                    }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window :
                        "undefined" != typeof global ? global : {})
                }, {}],
            31: [function (e, t, r) {
                    "use strict";

                    function n(e) {
                        var t = "";
                        do t = a[e % c] + t, e = Math.floor(e / c); while (e > 0);
                        return t
                    }
                    function o(e) {
                        var t = 0;
                        for (h = 0; h < e.length; h++) t = t * c + p[e.charAt(h)];
                        return t
                    }
                    function s() {
                        var e = n(+new Date);
                        return e !== i ? (u = 0, i = e) : e + "." + n(u++)
                    }
                    for (var i, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c =
                            64, p = {}, u = 0, h = 0; c > h; h++) p[a[h]] = h;
                    s.encode = n, s.decode = o, t.exports = s
                }, {}]
        }, {}, [1])(1)
    });
})();
(function (ns) {
    var CLIENT_VERSION = "0.6.4";
    var NODE_CLIENT = 0;
    ns.wrapper = function (good, wd) {
        var h, aa = this;

        function m(a) {
            return void 0 !== a
        }
        function ba() {}
        function ca(a) {
            a.Ua = function () {
                return a.md ? a.md : a.md = new a
            }
        }

        function da(a) {
            var b = typeof a;
            if ("object" == b) if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice &&
                        "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !
                        a.propertyIsEnumerable("call")) return "function"
                } else return "null";
                else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        }
        function ea(a) {
            return "array" == da(a)
        }
        function p(a) {
            return "string" == typeof a
        }
        function fa(a) {
            return "number" == typeof a
        }
        function ga(a) {
            return "function" == da(a)
        }
        function ha(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        }
        function ia(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }

        function ja(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        }
        function q(a, b, c) {
            q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
            return q.apply(null, arguments)
        }
        var ka = Date.now || function () {
                return +new Date
            };

        function la(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.we = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.qe = function (a, c, f) {
                for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
                return b.prototype[c].apply(a, g)
            }
        };
        var ma = {};

        function na(a, b) {
            this.type = oa;
            this.source = pa;
            this.path = a;
            this.Xc = b
        }
        na.prototype.Pb = function () {
            return this.path.j() ? this : new na(r(this.path), this.Xc)
        };
        na.prototype.toString = function () {
            return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.Xc + ")"
        };

        function qa(a, b) {
            this.type = ra;
            this.source = a;
            this.path = b
        }
        qa.prototype.Pb = function () {
            return this.path.j() ? new qa(this.source, t) : new qa(this.source, r(this.path))
        };
        qa.prototype.toString = function () {
            return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)"
        };

        function sa(a, b, c) {
            this.type = ta;
            this.source = a;
            this.path = b;
            this.Ba = c
        }
        sa.prototype.Pb = function (a) {
            return this.path.j() ? new sa(this.source, t, this.Ba.P(a)) : new sa(this.source, r(this.path), this.Ba)
        };
        sa.prototype.toString = function () {
            return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Ba.toString() + ")"
        };

        function v() {}
        v.prototype.R;
        v.prototype.J;
        v.prototype.ba;
        v.prototype.P;
        v.prototype.ia;
        v.prototype.Lc;
        v.prototype.T;
        v.prototype.M;
        v.prototype.wa;
        v.prototype.j;
        v.prototype.Qa;
        v.prototype.N;
        v.prototype.hash;
        v.prototype.kb;
        v.prototype.$;
        v.prototype.La;
        v.prototype.ub;

        function w(a, b) {
            this.name = a;
            this.node = b
        }
        function ua(a, b) {
            return new w(a, b)
        };

        function va(a, b) {
            return wa(a.name, b.name)
        }
        function xa(a, b) {
            return wa(a, b)
        };

        function ya(a) {
            this.g = a;
            this.f = null
        }
        ya.prototype.get = function () {
            var a = this.g.get(),
                b = za(a);
            if (this.f) for (var c in this.f) b[c] -= this.f[c];
            this.f = a;
            return b
        };

        function Aa(a, b) {
            this.td = {};
            this.sa = new ya(a);
            this.g = b;
            var c = 1E4 + 2E4 * Math.random();
            setTimeout(q(this.f, this), Math.floor(c))
        }
        Aa.prototype.f = function () {
            var a = this.sa.get(),
                b = {}, c = !1,
                d;
            for (d in a) 0 < a[d] && x(this.td, d) && (b[d] = a[d], c = !0);
            c && this.g.Uc(b);
            setTimeout(q(this.f, this), Math.floor(6E5 * Math.random()))
        };

        function z(a, b) {
            if (1 == arguments.length) {
                this.D = a.split("/");
                for (var c = 0, d = 0; d < this.D.length; d++) 0 < this.D[d].length && (this.D[c] = this.D[d], c++);
                this.D.length = c;
                this.aa = 0
            } else this.D = a, this.aa = b
        }
        function A(a, b) {
            var c = B(a);
            if (null === c) return b;
            if (c === B(b)) return A(r(a), r(b));
            throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
        }
        function B(a) {
            return a.aa >= a.D.length ? null : a.D[a.aa]
        }
        function Ba(a) {
            return a.D.length - a.aa
        }

        function r(a) {
            var b = a.aa;
            b < a.D.length && b++;
            return new z(a.D, b)
        }
        function Ca(a) {
            return a.aa < a.D.length ? a.D[a.D.length - 1] : null
        }
        h = z.prototype;
        h.toString = function () {
            for (var a = "", b = this.aa; b < this.D.length; b++) "" !== this.D[b] && (a += "/" + this.D[b]);
            return a || "/"
        };
        h.slice = function (a) {
            return this.D.slice(this.aa + (a || 0))
        };
        h.parent = function () {
            if (this.aa >= this.D.length) return null;
            for (var a = [], b = this.aa; b < this.D.length - 1; b++) a.push(this.D[b]);
            return new z(a, 0)
        };
        h.G = function (a) {
            for (var b = [], c = this.aa; c < this.D.length; c++) b.push(this.D[c]);
            if (a instanceof z) for (c = a.aa; c < a.D.length; c++) b.push(a.D[c]);
            else for (a = a.split("/"), c = 0; c < a.length; c++) 0 < a[c].length && b.push(a[c]);
            return new z(b, 0)
        };
        h.j = function () {
            return this.aa >= this.D.length
        };
        h.$ = function (a) {
            if (Ba(this) !== Ba(a)) return !1;
            for (var b = this.aa, c = a.aa; b <= this.D.length; b++, c++) if (this.D[b] !== a.D[c]) return !1;
            return !0
        };
        h.contains = function (a) {
            var b = this.aa,
                c = a.aa;
            if (Ba(this) > Ba(a)) return !1;
            for (; b < this.D.length;) {
                if (this.D[b] !== a.D[c]) return !1;
                ++b;
                ++c
            }
            return !0
        };
        var t = new z("");

        function Da(a, b) {
            this.g = a.slice();
            this.f = Math.max(1, this.g.length);
            this.m = b;
            for (var c = 0; c < this.g.length; c++) this.f += Ea(this.g[c]);
            Fa(this)
        }
        Da.prototype.push = function (a) {
            0 < this.g.length && (this.f += 1);
            this.g.push(a);
            this.f += Ea(a);
            Fa(this)
        };
        Da.prototype.pop = function () {
            var a = this.g.pop();
            this.f -= Ea(a);
            0 < this.g.length && --this.f
        };

        function Fa(a) {
            if (768 < a.f) throw Error(a.m + "has a key path longer than 768 bytes (" + a.f + ").");
            if (32 < a.g.length) throw Error(a.m +
                    "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " +
                    Ga(a));
        }
        function Ga(a) {
            return 0 == a.g.length ? "" : "in property '" + a.g.join(".") + "'"
        };

        function Ha(a, b) {
            return a && "object" === typeof a ? (C(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) :
                a
        }
        function Ia(a, b) {
            var c = new Ja;
            Ka(a, new z(""), function (a, e) {
                c.Ab(a, La(e, b))
            });
            return c
        }
        function La(a, b) {
            var c = a.J().N(),
                c = Ha(c, b),
                d;
            if (a.R()) {
                var e = Ha(a.va(), b);
                return e !== a.va() || c !== a.J().N() ? new Ma(e, D(c)) : a
            }
            d = a;
            c !== a.J().N() && (d = d.ba(new Ma(c)));
            a.X(E, function (a, c) {
                var e = La(c, b);
                e !== c && (d = d.T(a, e))
            });
            return d
        };

        function Na(a, b, c) {
            this.f = a;
            this.da = b;
            this.mb = c
        }
        function Oa(a) {
            return a.da
        }
        function Pa(a, b) {
            return a.da && !a.mb || a.f.wa(b)
        }
        Na.prototype.o = function () {
            return this.f
        };

        function F(a, b, c, d) {
            this.type = a;
            this.Ca = b;
            this.Ja = c;
            this.Rc = d;
            this.kc = void 0
        }
        function Qa(a) {
            return new F(Ra, a)
        }
        var Ra = "value";

        function Sa() {}
        Sa.prototype.kd = function () {
            return null
        };
        Sa.prototype.Jc = function () {
            return null
        };
        var Ta = new Sa;

        function Ua(a, b, c) {
            this.xd = a;
            this.Da = b;
            this.hc = c
        }
        Ua.prototype.kd = function (a) {
            var b = this.Da.L;
            if (Pa(b, a)) return b.o().P(a);
            b = null != this.hc ? new Na(this.hc, !0, !1) : this.Da.H();
            return this.xd.Ia(a, b)
        };
        Ua.prototype.Jc = function (a, b, c) {
            var d = null != this.hc ? this.hc : Va(this.Da);
            a = this.xd.zc(d, b, 1, c, a);
            return 0 === a.length ? null : a[0]
        };

        function Wa() {}
        Wa.prototype.Va;
        Wa.prototype.cc;
        Wa.prototype.Pa;
        Wa.prototype.toString;

        function Xa(a, b, c, d) {
            this.Fc = b;
            this.nc = c;
            this.kc = d;
            this.ac = a
        }
        Xa.prototype.Va = function () {
            var a = this.nc.zb();
            return "value" === this.ac ? a.path : a.parent().path
        };
        Xa.prototype.cc = function () {
            return this.ac
        };
        Xa.prototype.Pa = function () {
            return this.Fc.Pa(this)
        };
        Xa.prototype.toString = function () {
            return this.Va().toString() + ":" + this.ac + ":" + G(this.nc.gd())
        };

        function Ya(a, b, c) {
            this.Fc = a;
            this.error = b;
            this.path = c
        }
        Ya.prototype.Va = function () {
            return this.path
        };
        Ya.prototype.cc = function () {
            return "cancel"
        };
        Ya.prototype.Pa = function () {
            return this.Fc.Pa(this)
        };
        Ya.prototype.toString = function () {
            return this.path.toString() + ":cancel"
        };

        function Za() {
            this.f = []
        }
        function $a(a, b) {
            for (var c = null, d = 0; d < b.length; d++) {
                var e = b[d],
                    f = e.Va();
                null === c || f.$(c.Va()) || (a.f.push(c), c = null);
                null === c && (c = new ab(f));
                c.add(e)
            }
            c && a.f.push(c)
        }
        function bb(a, b, c) {
            $a(a, c);
            cb(a, function (a) {
                return a.$(b)
            })
        }
        function db(a, b, c) {
            $a(a, c);
            cb(a, function (a) {
                return a.contains(b) || b.contains(a)
            })
        }

        function cb(a, b) {
            for (var c = !0, d = 0; d < a.f.length; d++) {
                var e = a.f[d];
                if (e) if (e = e.Va(), b(e)) {
                        for (var e = a.f[d], f = 0; f < e.bc.length; f++) {
                            var g = e.bc[f];
                            if (null !== g) {
                                e.bc[f] = null;
                                var k = g.Pa();
                                eb && fb("event: " + g.toString());
                                gb(k)
                            }
                        }
                        a.f[d] = null
                    } else c = !1
            }
            c && (a.f = [])
        }
        function ab(a) {
            this.oa = a;
            this.bc = []
        }
        ab.prototype.add = function (a) {
            this.bc.push(a)
        };
        ab.prototype.Va = function () {
            return this.oa
        };
        var hb = {
            NETWORK_ERROR: "Unable to contact the Wilddog server.",
            SERVER_ERROR: "An unknown server error occurred.",
            TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
            REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
            USER_CANCELLED: "The user cancelled authentication."
        };

        function I(a) {
            var b = Error(J(hb, a), a);
            b.code = a;
            return b
        };

        function ib() {
            return "undefined" !== typeof window && !! (window.cordova || window.phonegap || window.PhoneGap) &&
                /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)
        }
        function jb() {
            return "undefined" !== typeof location && /^file:\//.test(location.href)
        }

        function kb() {
            if ("undefined" === typeof navigator) return !1;
            var a = navigator.userAgent;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1])
            } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length) return 8 <=
                    parseFloat(a[1]);
            return !1
        };

        function x(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }
        function J(a, b) {
            if (Object.prototype.hasOwnProperty.call(a, b)) return a[b]
        }
        function lb(a, b) {
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
        }
        function mb(a) {
            var b = {};
            lb(a, function (a, d) {
                b[a] = d
            });
            return b
        };

        function nb(a) {
            this.Jb = a;
            this.jc = "wilddog:"
        }
        nb.prototype.set = function (a, b) {
            null == b ? this.Jb.removeItem(this.jc + a) : this.Jb.setItem(this.jc + a, G(b))
        };
        nb.prototype.get = function (a) {
            a = this.Jb.getItem(this.jc + a);
            return null == a ? null : ob(a)
        };
        nb.prototype.remove = function (a) {
            this.Jb.removeItem(this.jc + a)
        };
        nb.prototype.toString = function () {
            return this.Jb.toString()
        };

        function pb() {
            this.Gb = {}
        }
        pb.prototype.set = function (a, b) {
            null == b ? delete this.Gb[a] : this.Gb[a] = b
        };
        pb.prototype.get = function (a) {
            return x(this.Gb, a) ? this.Gb[a] : null
        };
        pb.prototype.remove = function (a) {
            delete this.Gb[a]
        };

        function qb(a) {
            try {
                if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
                    var b = window[a];
                    b.setItem("wilddog:sentinel", "cache");
                    b.removeItem("wilddog:sentinel");
                    return new nb(b)
                }
            } catch (c) {}
            return new pb
        }
        var rb = qb("localStorage"),
            K = qb("sessionStorage");

        function sb(a, b, c, d, e) {
            this.host = a.toLowerCase();
            this.domain = this.host.substr(this.host.indexOf(".") + 1);
            this.ab = b;
            this.wb = c;
            this.ic = e || "";
            this.Aa = rb.get("host:" + a) || this.host;
            this.Na = JSON.parse(K.get("failHosts")) || []
        }
        function tb(a, b) {
            null == b ? (a.Aa = a.host, "s-" === a.Aa.substr(0, 2) && rb.remove("host:" + a.host)) : b !== a.Aa && 0 <
                b.indexOf(".wilddogio.com") && (a.Aa = b, "s-" === a.Aa.substr(0, 2) && rb.set("host:" + a.host, a.Aa))
        }
        sb.prototype.toString = function () {
            var a = (this.ab ? "https://" : "http://") + this.host;
            this.ic && (a += "<" + this.ic + ">");
            return a
        };
        var ub = "auth.wilddog.com";

        function vb(a, b, c) {
            this.Vb = a || {};
            this.qc = b || {};
            this.Ka = c || {};
            this.Vb.remember || (this.Vb.remember = "default")
        }
        var wb = ["remember", "redirectTo"];

        function xb(a) {
            var b = {}, c = {};
            lb(a || {}, function (a, e) {
                0 <= yb(wb, a) ? b[a] = e : c[a] = e
            });
            return new vb(b, {}, c)
        };

        function L(a, b, c, d) {
            var e;
            d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
            if (e) throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") +
                    " Expects " + e + ".");
        }
        function M(a, b, c) {
            var d = "";
            switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
            }
            return a = a + " failed: " + (d + " argument ")
        }

        function N(a, b, c, d) {
            if ((!d || m(c)) && !ga(c)) throw Error(M(a, b, d) + "must be a valid function.");
        }
        function zb(a, b, c) {
            if (m(c) && (!ha(c) || null === c)) throw Error(M(a, b, !0) + "must be a valid context object.");
        };

        function Ab() {
            this.g = -1
        };

        function Bb() {
            this.g = -1;
            this.g = 64;
            this.f = [];
            this.I = [];
            this.W = [];
            this.u = [];
            this.u[0] = 128;
            for (var a = 1; a < this.g; ++a) this.u[a] = 0;
            this.B = this.m = 0;
            this.f[0] = 1732584193;
            this.f[1] = 4023233417;
            this.f[2] = 2562383102;
            this.f[3] = 271733878;
            this.f[4] = 3285377520;
            this.B = this.m = 0
        }
        la(Bb, Ab);

        function Cb(a, b, c) {
            c || (c = 0);
            var d = a.W;
            if (p(b)) for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(
                        c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
            else for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
            for (e = 16; 80 > e; e++) {
                var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
                d[e] = (f << 1 | f >>> 31) & 4294967295
            }
            b = a.f[0];
            c = a.f[1];
            for (var g = a.f[2], k = a.f[3], l = a.f[4], n, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = k ^ c & (g ^ k),
                    n = 1518500249) : (f = c ^ g ^ k, n = 1859775393) : 60 > e ? (f = c & g | k & (c | g), n =
                    2400959708) : (f = c ^ g ^ k, n = 3395469782), f = (b <<
                    5 | b >>> 27) + f + l + n + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295,
                    c = b, b = f;
            a.f[0] = a.f[0] + b & 4294967295;
            a.f[1] = a.f[1] + c & 4294967295;
            a.f[2] = a.f[2] + g & 4294967295;
            a.f[3] = a.f[3] + k & 4294967295;
            a.f[4] = a.f[4] + l & 4294967295
        }
        Bb.prototype.update = function (a, b) {
            if (null != a) {
                m(b) || (b = a.length);
                for (var c = b - this.g, d = 0, e = this.I, f = this.m; d < b;) {
                    if (0 == f) for (; d <= c;) Cb(this, a, d), d += this.g;
                    if (p(a)) for (; d < b;) {
                            if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.g) {
                                Cb(this, e);
                                f = 0;
                                break
                            }
                    } else for (; d < b;) if (e[f] = a[d], ++f, ++d, f == this.g) {
                                Cb(this, e);
                                f = 0;
                                break
                            }
                }
                this.m = f;
                this.B += b
            }
        };

        function Db(a) {
            a = String(a);
            if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(
                /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,
                "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
                    return eval("(" + a + ")")
            } catch (b) {}
            throw Error("Invalid JSON string: " + a);
        }
        function Eb() {}

        function Fb(a, b, c) {
            if (null == b) c.push("null");
            else {
                if ("object" == typeof b) {
                    if (ea(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++) c.push(e), Fb(a, d[f], c), e = ",";
                        c.push("]");
                        return
                    }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                    else {
                        c.push("{");
                        e = "";
                        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f &&
                                (c.push(e), Gb(d, c), c.push(":"), Fb(a, f, c), e = ","));
                        c.push("}");
                        return
                    }
                }
                switch (typeof b) {
                case "string":
                    Gb(b, c);
                    break;
                case "number":
                    c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                    break;
                case "boolean":
                    c.push(String(b));
                    break;
                case "function":
                    c.push("null");
                    break;
                default:
                    throw Error("Unknown type: " + typeof b);
                }
            }
        }
        var Hb = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        }, Ib = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

        function Gb(a, b) {
            b.push('"', a.replace(Ib, function (a) {
                var b = Hb[a];
                b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Hb[a] = b);
                return b
            }), '"')
        };

        function Jb(a) {
            var b = [];
            lb(a, function (a, d) {
                ea(d) ? Kb(d, function (d) {
                    b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d))
                }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d))
            });
            return b.length ? "&" + b.join("&") : ""
        }
        function Lb(a) {
            var b = {};
            a = a.replace(/^\?/, "").split("&");
            Kb(a, function (a) {
                a && (a = a.split("="), b[a[0]] = a[1])
            });
            return b
        }
        function ob(a) {
            return "undefined" !== typeof JSON && m(JSON.parse) ? JSON.parse(a) : Db(a)
        }

        function G(a) {
            if ("undefined" !== typeof JSON && m(JSON.stringify)) a = JSON.stringify(a);
            else {
                var b = [];
                Fb(new Eb, a, b);
                a = b.join("")
            }
            return a
        }
        function Mb() {
            this.mc = O
        }
        Mb.prototype.o = function (a) {
            return this.mc.ia(a)
        };
        Mb.prototype.toString = function () {
            return this.mc.toString()
        };

        function Nb() {
            var a = window.opener.frames,
                b;
            for (b = a.length - 1; 0 <= b; b--) try {
                    if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host &&
                        "__winchan_relay_frame" === a[b].name) return a[b]
            } catch (c) {}
            return null
        }
        function Ob(a, b, c) {
            a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
        }
        function Pb(a, b, c) {
            a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1)
        }

        function Qb(a) {
            /^https?:\/\//.test(a) || (a = window.location.href);
            var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
            return b ? b[1] : a
        }
        function Rb(a) {
            var b = "";
            try {
                a = a.replace("#", "");
                var c = Lb(a);
                c && x(c, "__wilddog_request_key") && (b = J(c, "__wilddog_request_key"))
            } catch (d) {}
            return b
        }
        function Sb() {
            var a = Tb(ub);
            return a.scheme + "://" + a.host + "/v1"
        }
        function Ub(a) {
            return Sb() + "/" + a + "/auth/channel"
        };

        function Vb(a) {
            a.callback_parameter || (a.callback_parameter = "callback");
            this.f = a;
            window.__wilddog_auth_jsonp = window.__wilddog_auth_jsonp || {}
        }
        Vb.prototype.open = function (a, b, c) {
            function d() {
                c && (c(I("REQUEST_INTERRUPTED")), c = null)
            }
            function e() {
                setTimeout(function () {
                    window.__wilddog_auth_jsonp[f] = void 0;
                    Wb(window.__wilddog_auth_jsonp) && (window.__wilddog_auth_jsonp = void 0);
                    try {
                        var a = document.getElementById(f);
                        a && a.parentNode.removeChild(a)
                    } catch (b) {}
                }, 1);
                Pb(window, "beforeunload", d)
            }
            var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
            b[this.f.callback_parameter] = "__wilddog_auth_jsonp." + f;
            a += (/\?/.test(a) ? "" : "?") + Jb(b);
            Ob(window,
                "beforeunload", d);
            window.__wilddog_auth_jsonp[f] = function (a) {
                c && (c(null, a), c = null);
                e()
            };
            Xb(f, a, c)
        };

        function Xb(a, b, c) {
            setTimeout(function () {
                try {
                    var d = document.createElement("script");
                    d.type = "text/javascript";
                    d.id = a;
                    d.async = !0;
                    d.src = b;
                    d.onerror = function () {
                        var b = document.getElementById(a);
                        null !== b && b.parentNode.removeChild(b);
                        c && c(I("NETWORK_ERROR"))
                    };
                    var e, f = document.getElementsByTagName("head");
                    f && 0 != f.length ? e = f[0] : e = document.documentElement;
                    e.appendChild(d)
                } catch (g) {
                    c && c(I("NETWORK_ERROR"))
                }
            }, 0)
        }
        Vb.isAvailable = function () {
            return !NODE_CLIENT
        };
        Vb.prototype.jb = function () {
            return "json"
        };

        function Yb(a) {
            a.method || (a.method = "GET");
            a.headers || (a.headers = {});
            a.headers.content_type || (a.headers.content_type = "application/json");
            a.headers.content_type = a.headers.content_type.toLowerCase();
            this.f = a
        }
        Yb.prototype.open = function (a, b, c) {
            var d = Tb(a),
                e = "http" === d.scheme ? require("http") : require("https");
            a = this.f.method;
            var f, g = {
                    Accept: "application/json;text/plain"
                };
            Zb(g, this.f.headers);
            d = {
                host: d.host.split(":")[0],
                port: d.port,
                path: d.yb,
                method: this.f.method.toUpperCase()
            };
            if ("GET" === a) d.path += (/\?/.test(d.path) ? "" : "?") + Jb(b), f = null;
            else {
                var k = this.f.headers.content_type;
                "application/json" === k && (f = G(b));
                "application/x-www-form-urlencoded" === k && (f = Jb(b));
                g["Content-Length"] = Buffer.byteLength(f, "utf8")
            }
            d.headers =
                g;
            b = e.request(d, function (a) {
                var b = "";
                a.setEncoding("utf8");
                a.on("data", function (a) {
                    b += a
                });
                a.on("end", function () {
                    try {
                        b = ob(b + "")
                    } catch (a) {}
                    c && (c(null, b), c = null)
                })
            });
            "GET" !== a && b.write(f);
            b.on("error", function (a) {
                a && a.code && ("ENOTFOUND" === a.code || "ENETDOWN" === a.code) ? c(I("NETWORK_ERROR")) : c(I(
                    "SERVER_ERROR"));
                c = null
            });
            b.end()
        };
        Yb.isAvailable = function () {
            return NODE_CLIENT
        };
        Yb.prototype.jb = function () {
            return "json"
        };

        function $b(a) {
            var b = this;
            this.f = a;
            this.u = "*";
            kb() ? this.g = this.m = Nb() : (this.g = window.opener, this.m = window);
            if (!b.g) throw "Unable to find relay frame";
            Ob(this.m, "message", q(this.I, this));
            Ob(this.m, "message", q(this.B, this));
            try {
                ac(this, {
                    a: "ready"
                })
            } catch (c) {
                Ob(this.g, "load", function () {
                    ac(b, {
                        a: "ready"
                    })
                })
            }
            Ob(window, "unload", q(this.ca, this))
        }
        function ac(a, b) {
            b = G(b);
            kb() ? a.g.doPost(b, a.u) : a.g.postMessage(b, a.u)
        }
        $b.prototype.I = function (a) {
            var b = this,
                c;
            try {
                c = ob(a.data)
            } catch (d) {}
            c && "request" === c.a && (Pb(window, "message", this.I), this.u = a.origin, this.f && setTimeout(function () {
                b.f(b.u, c.d, function (a, c) {
                    b.W = !c;
                    b.f = void 0;
                    ac(b, {
                        a: "response",
                        d: a,
                        forceKeepWindowOpen: c
                    })
                })
            }, 0))
        };
        $b.prototype.ca = function () {
            try {
                Pb(this.m, "message", this.B)
            } catch (a) {}
            this.f && (ac(this, {
                a: "error",
                d: "unknown closed window"
            }), this.f = void 0);
            try {
                window.close()
            } catch (a) {}
        };
        $b.prototype.B = function (a) {
            if (this.W && "die" === a.data) try {
                    window.close()
            } catch (b) {}
        };

        function bc() {
            this.f = cc() + cc() + cc()
        }
        bc.prototype.open = function (a, b) {
            K.set("redirect_request_id", this.f);
            K.set("redirect_request_id", this.f);
            b.requestId = this.f;
            b.redirectTo = b.redirectTo || window.location.href;
            a += (/\?/.test(a) ? "" : "?") + Jb(b);
            window.location = a
        };
        bc.isAvailable = function () {
            return !NODE_CLIENT && !jb() && !ib()
        };
        bc.prototype.jb = function () {
            return "redirect"
        };

        function dc(a) {
            a.method || (a.method = "GET");
            a.headers || (a.headers = {});
            a.headers.content_type || (a.headers.content_type = "application/json");
            a.headers.content_type = a.headers.content_type.toLowerCase();
            this.f = a
        }
        dc.prototype.open = function (a, b, c) {
            function d() {
                c && (c(I("REQUEST_INTERRUPTED")), c = null)
            }
            var e = new XMLHttpRequest,
                f = this.f.method.toUpperCase(),
                g;
            Ob(window, "beforeunload", d);
            e.onreadystatechange = function () {
                if (c && 4 === e.readyState) {
                    var a;
                    if (200 <= e.status && 300 > e.status) {
                        try {
                            a = ob(e.responseText)
                        } catch (b) {}
                        c(null, a)
                    } else 500 <= e.status && 600 > e.status ? c(I("SERVER_ERROR")) : c(I("NETWORK_ERROR"));
                    c = null;
                    Pb(window, "beforeunload", d)
                }
            };
            if ("GET" === f) a += (/\?/.test(a) ? "" : "?") + Jb(b), g = null;
            else {
                var k = this.f.headers.content_type;
                "application/json" === k && (g = G(b));
                "application/x-www-form-urlencoded" === k && (g = Jb(b))
            }
            e.open(f, a, !0);
            a = {
                "X-Requested-With": "XMLHttpRequest",
                Accept: "application/json;text/plain"
            };
            Zb(a, this.f.headers);
            for (var l in a) e.setRequestHeader(l, a[l]);
            e.send(g)
        };
        dc.isAvailable = function () {
            return !NODE_CLIENT && !! window.XMLHttpRequest && (!("undefined" !== typeof navigator && (navigator.userAgent
                .match(/MSIE/) || navigator.userAgent.match(/Trident/))) || kb())
        };
        dc.prototype.jb = function () {
            return "json"
        };

        function P(a, b) {
            for (var c in a) b.call(void 0, a[c], c, a)
        }
        function ec(a, b) {
            var c = {}, d;
            for (d in a) c[d] = b.call(void 0, a[d], d, a);
            return c
        }
        function fc(a, b) {
            for (var c in a) if (!b.call(void 0, a[c], c, a)) return !1;
            return !0
        }
        function gc(a) {
            var b = 0,
                c;
            for (c in a) b++;
            return b
        }
        function hc(a) {
            for (var b in a) return b
        }
        function ic(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b
        }
        function jc(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        }
        function kc(a, b) {
            return null !== a && b in a
        }

        function lc(a, b) {
            for (var c in a) if (a[c] == b) return !0;
            return !1
        }
        function mc(a, b, c) {
            for (var d in a) if (b.call(c, a[d], d, a)) return d
        }
        function nc(a, b) {
            var c = mc(a, b, void 0);
            return c && a[c]
        }
        function Wb(a) {
            for (var b in a) return !1;
            return !0
        }
        function za(a) {
            var b = {}, c;
            for (c in a) b[c] = a[c];
            return b
        }
        var oc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
            " ");

        function Zb(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < oc.length; f++) c = oc[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[
                        c])
            }
        };

        function cc() {
            return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^
                ka()).toString(36)
        };
        var yb = Array.prototype.indexOf ? function (a, b, c) {
                return Array.prototype.indexOf.call(a, b, c)
            } : function (a, b, c) {
                c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                if (p(a)) return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                for (; c < a.length; c++) if (c in a && a[c] === b) return c;
                return -1
            }, Kb = Array.prototype.forEach ? function (a, b, c) {
                Array.prototype.forEach.call(a, b, c)
            } : function (a, b, c) {
                for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
            }, pc = Array.prototype.filter ? function (a, b, c) {
                return Array.prototype.filter.call(a,
                    b, c)
            } : function (a, b, c) {
                for (var d = a.length, e = [], f = 0, g = p(a) ? a.split("") : a, k = 0; k < d; k++) if (k in g) {
                        var l = g[k];
                        b.call(c, l, k, a) && (e[f++] = l)
                    }
                return e
            }, qc = Array.prototype.map ? function (a, b, c) {
                return Array.prototype.map.call(a, b, c)
            } : function (a, b, c) {
                for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b
                        .call(c, f[g], g, a));
                return e
            }, rc = Array.prototype.reduce ? function (a, b, c, d) {
                d && (b = q(b, d));
                return Array.prototype.reduce.call(a, b, c)
            } : function (a, b, c, d) {
                var e = c;
                Kb(a, function (c, g) {
                    e = b.call(d,
                        e, c, g, a)
                });
                return e
            }, sc = Array.prototype.every ? function (a, b, c) {
                return Array.prototype.every.call(a, b, c)
            } : function (a, b, c) {
                for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && !b.call(c, e[f], f,
                        a)) return !1;
                return !0
            };

        function tc(a, b) {
            var c = uc(a, b, void 0);
            return 0 > c ? null : p(a) ? a.charAt(c) : a[c]
        }
        function uc(a, b, c) {
            for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a))
                    return f;
            return -1
        }
        function vc(a, b) {
            var c = yb(a, b);
            0 <= c && Array.prototype.splice.call(a, c, 1)
        }

        function wc(a, b) {
            a.sort(b || xc)
        }
        function xc(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        };

        function yc() {
            this.f = {}
        }
        yc.prototype.get = function () {
            return za(this.f)
        };
        var zc = {}, Ac = {};

        function Bc(a) {
            a = a.toString();
            zc[a] || (zc[a] = new yc);
            return zc[a]
        }
        function Cc(a, b) {
            var c = a.toString();
            Ac[c] || (Ac[c] = b());
            return Ac[c]
        };
        ({}).le;

        function Dc(a, b) {
            this.g = a;
            this.f = b ? b : Ec
        }
        h = Dc.prototype;
        h.Ea = function (a, b) {
            return new Dc(this.g, this.f.Ea(a, b, this.g).Z(null, null, Fc, null, null))
        };
        h.remove = function (a) {
            return new Dc(this.g, this.f.remove(a, this.g).Z(null, null, Fc, null, null))
        };
        h.get = function (a) {
            for (var b, c = this.f; !c.j();) {
                b = this.g(a, c.key);
                if (0 === b) return c.value;
                0 > b ? c = c.left : 0 < b && (c = c.right)
            }
            return null
        };

        function Gc(a, b) {
            for (var c, d = a.f, e = null; !d.j();) {
                c = a.g(b, d.key);
                if (0 === c) {
                    if (d.left.j()) return e ? e.key : null;
                    for (d = d.left; !d.right.j();) d = d.right;
                    return d.key
                }
                0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
            }
            throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
        }
        h.j = function () {
            return this.f.j()
        };
        h.count = function () {
            return this.f.count()
        };
        h.Nb = function () {
            return this.f.Nb()
        };
        h.vb = function () {
            return this.f.vb()
        };
        h.ja = function (a) {
            return this.f.ja(a)
        };
        h.ob = function (a) {
            return new Hc(this.f, null, this.g, !1, a)
        };
        h.pb = function (a, b) {
            return new Hc(this.f, a, this.g, !1, b)
        };
        h.qb = function (a, b) {
            return new Hc(this.f, a, this.g, !0, b)
        };
        h.ld = function (a) {
            return new Hc(this.f, null, this.g, !0, a)
        };

        function Hc(a, b, c, d, e) {
            this.f = e || null;
            this.g = d;
            this.Fa = [];
            for (e = 1; !a.j();) if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e) a = this.g ? a.left : a.right;
                else if (0 === e) {
                this.Fa.push(a);
                break
            } else this.Fa.push(a), a = this.g ? a.right : a.left
        }

        function Q(a) {
            if (0 === a.Fa.length) return null;
            var b = a.Fa.pop(),
                c;
            a.f ? c = a.f(b.key, b.value) : c = {
                key: b.key,
                value: b.value
            };
            if (a.g) for (b = b.left; !b.j();) a.Fa.push(b), b = b.right;
            else for (b = b.right; !b.j();) a.Fa.push(b), b = b.left;
            return c
        }
        function Ic(a) {
            if (0 === a.Fa.length) return null;
            var b;
            b = a.Fa;
            b = b[b.length - 1];
            return a.f ? a.f(b.key, b.value) : {
                key: b.key,
                value: b.value
            }
        }
        function Jc(a, b, c, d, e) {
            this.key = a;
            this.value = b;
            this.color = null != c ? c : Kc;
            this.left = null != d ? d : Ec;
            this.right = null != e ? e : Ec
        }
        var Kc = !0,
            Fc = !1;
        h = Jc.prototype;
        h.Z = function (a, b, c, d, e) {
            return new Jc(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ?
                d : this.left, null != e ? e : this.right)
        };
        h.count = function () {
            return this.left.count() + 1 + this.right.count()
        };
        h.j = function () {
            return !1
        };
        h.ja = function (a) {
            return this.left.ja(a) || a(this.key, this.value) || this.right.ja(a)
        };

        function Lc(a) {
            return a.left.j() ? a : Lc(a.left)
        }
        h.Nb = function () {
            return Lc(this).key
        };
        h.vb = function () {
            return this.right.j() ? this.key : this.right.vb()
        };
        h.Ea = function (a, b, c) {
            var d, e;
            e = this;
            d = c(a, e.key);
            e = 0 > d ? e.Z(null, null, null, e.left.Ea(a, b, c), null) : 0 === d ? e.Z(null, b, null, null, null) : e.Z(
                null, null, null, null, e.right.Ea(a, b, c));
            return Mc(e)
        };

        function Nc(a) {
            if (a.left.j()) return Ec;
            a.left.ga() || a.left.left.ga() || (a = Oc(a));
            a = a.Z(null, null, null, Nc(a.left), null);
            return Mc(a)
        }
        h.remove = function (a, b) {
            var c, d;
            c = this;
            if (0 > b(a, c.key)) c.left.j() || c.left.ga() || c.left.left.ga() || (c = Oc(c)), c = c.Z(null, null, null,
                    c.left.remove(a, b), null);
            else {
                c.left.ga() && (c = Pc(c));
                c.right.j() || c.right.ga() || c.right.left.ga() || (c = Qc(c), c.left.left.ga() && (c = Pc(c), c = Qc(
                    c)));
                if (0 === b(a, c.key)) {
                    if (c.right.j()) return Ec;
                    d = Lc(c.right);
                    c = c.Z(d.key, d.value, null, null, Nc(c.right))
                }
                c = c.Z(null, null, null, null, c.right.remove(a, b))
            }
            return Mc(c)
        };
        h.ga = function () {
            return this.color
        };

        function Mc(a) {
            a.right.ga() && !a.left.ga() && (a = Rc(a));
            a.left.ga() && a.left.left.ga() && (a = Pc(a));
            a.left.ga() && a.right.ga() && (a = Qc(a));
            return a
        }
        function Oc(a) {
            a = Qc(a);
            a.right.left.ga() && (a = a.Z(null, null, null, null, Pc(a.right)), a = Rc(a), a = Qc(a));
            return a
        }
        function Rc(a) {
            return a.right.Z(null, null, a.color, a.Z(null, null, Kc, null, a.right.left), null)
        }
        function Pc(a) {
            return a.left.Z(null, null, a.color, null, a.Z(null, null, Kc, a.left.right, null))
        }

        function Qc(a) {
            return a.Z(null, null, !a.color, a.left.Z(null, null, !a.left.color, null, null), a.right.Z(null, null, !a.right
                .color, null, null))
        }
        function Sc() {}
        h = Sc.prototype;
        h.Z = function () {
            return this
        };
        h.Ea = function (a, b) {
            return new Jc(a, b, null)
        };
        h.remove = function () {
            return this
        };
        h.count = function () {
            return 0
        };
        h.j = function () {
            return !0
        };
        h.ja = function () {
            return !1
        };
        h.Nb = function () {
            return null
        };
        h.vb = function () {
            return null
        };
        h.ga = function () {
            return !1
        };
        var Ec = new Sc;
        var R;
        a: {
            var Tc = aa.navigator;
            if (Tc) {
                var Uc = Tc.userAgent;
                if (Uc) {
                    R = Uc;
                    break a
                }
            }
            R = ""
        };
        var Vc = -1 != R.indexOf("Opera") || -1 != R.indexOf("OPR"),
            Wc = -1 != R.indexOf("Trident") || -1 != R.indexOf("MSIE"),
            Xc = -1 != R.indexOf("Edge"),
            Yc = -1 != R.indexOf("Gecko") && !(-1 != R.toLowerCase().indexOf("webkit") && -1 == R.indexOf("Edge")) && !
                (-1 != R.indexOf("Trident") || -1 != R.indexOf("MSIE")) && -1 == R.indexOf("Edge"),
            Zc = -1 != R.toLowerCase().indexOf("webkit") && -1 == R.indexOf("Edge");

        function $c() {
            var a = R;
            if (Yc) return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (Xc) return /Edge\/([\d\.]+)/.exec(a);
            if (Wc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Zc) return /WebKit\/(\S+)/.exec(a)
        }(function () {
            if (Vc && aa.opera) {
                var a;
                var b = aa.opera.version;
                try {
                    a = b()
                } catch (c) {
                    a = b
                }
                return a
            }
            a = "";
            (b = $c()) && (a = b ? b[1] : "");
            return Wc && (b = (b = aa.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a
        })();
        var ad = null,
            bd = null;

        function cd(a) {
            var b = "";
            dd(a, function (a) {
                b += String.fromCharCode(a)
            });
            return b
        }
        function dd(a, b) {
            function c(b) {
                for (; d < a.length;) {
                    var c = a.charAt(d++),
                        e = bd[c];
                    if (null != e) return e;
                    if (!/^[\s\xa0]*$/.test(c)) throw Error("Unknown base64 encoding at char: " + c);
                }
                return b
            }
            ed();
            for (var d = 0;;) {
                var e = c(-1),
                    f = c(0),
                    g = c(64),
                    k = c(64);
                if (64 === k && -1 === e) break;
                b(e << 2 | f >> 4);
                64 != g && (b(f << 4 & 240 | g >> 2), 64 != k && b(g << 6 & 192 | k))
            }
        }

        function ed() {
            if (!ad) {
                ad = {};
                bd = {};
                for (var a = 0; 65 > a; a++) ad[a] =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), bd[ad[a]] = a,
                        62 <= a && (bd["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] =
                        a)
            }
        };
        var fd = function () {
            var a = 1;
            return function () {
                return a++
            }
        }();

        function C(a, b) {
            if (!a) throw gd(b);
        }
        function gd(a) {
            return Error("Wilddog (" + hd + ") INTERNAL ASSERT FAILED: " + a)
        }
        function id(a) {
            try {
                return NODE_CLIENT ? (new Buffer(a, "base64")).toString("utf8") : "undefined" !== typeof atob ? atob(a) :
                    cd(a)
            } catch (b) {
                fb("base64Decode failed: ", b)
            }
            return null
        }

        function jd(a) {
            for (var b = [], c = 0, d = 0; d < a.length; d++) {
                var e = a.charCodeAt(d);
                55296 <= e && 56319 >= e && (e = e - 55296, d++, C(d < a.length,
                    "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
                128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] =
                    e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
            }
            a = new Bb;
            a.update(b);
            b = [];
            d = 8 * a.B;
            56 > a.m ? a.update(a.u, 56 - a.m) : a.update(a.u, a.g - (a.m - 56));
            for (c = a.g - 1; 56 <= c; c--) a.I[c] = d & 255, d /= 256;
            Cb(a, a.I);
            for (c = d = 0; 5 > c; c++) for (e =
                    24; 0 <= e; e -= 8) b[d] = a.f[c] >> e & 255, ++d;
            ed();
            a = ad;
            c = [];
            for (d = 0; d < b.length; d += 3) {
                var f = b[d],
                    g = (e = d + 1 < b.length) ? b[d + 1] : 0,
                    k = d + 2 < b.length,
                    l = k ? b[d + 2] : 0,
                    n = f >> 2,
                    f = (f & 3) << 4 | g >> 4,
                    g = (g & 15) << 2 | l >> 6,
                    l = l & 63;
                k || (l = 64, e || (g = 64));
                c.push(a[n], a[f], a[g], a[l])
            }
            return c.join("")
        }

        function kd(a) {
            for (var b = "", c = 0; c < arguments.length; c++) var d = arguments[c],
            e = da(d), b = "array" == e || "object" == e && "number" == typeof d.length ? b + kd.apply(null, arguments[
                c]) : "object" === typeof arguments[c] ? b + G(arguments[c]) : b + arguments[c], b = b + " ";
            return b
        }
        var eb = null,
            ld = !0;

        function fb(a) {
            !0 === ld && (ld = !1, null === eb && !0 === K.get("logging_enabled") && md(!0));
            if (eb) {
                var b = kd.apply(null, arguments);
                eb(b)
            }
        }
        function nd(a) {
            return function () {
                fb(a, arguments)
            }
        }

        function od(a) {
            if ("undefined" !== typeof console) {
                var b = "WILDDOG INTERNAL ERROR: " + kd.apply(null, arguments);
                "undefined" !== typeof console.error ? console.error(b) : console.log(b)
            }
        }
        function pd(a) {
            var b = kd.apply(null, arguments);
            throw Error("WILDDOG FATAL ERROR: " + b);
        }
        function S(a) {
            if ("undefined" !== typeof console) {
                var b = "WILDDOG WARNING: " + kd.apply(null, arguments);
                "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
            }
        }

        function Tb(a) {
            var b = "",
                c = "",
                d = "",
                e = "",
                f = !0,
                g = "https",
                k = 443;
            if (p(a)) {
                var l = a.indexOf("//");
                0 <= l && (g = a.substring(0, l - 1), a = a.substring(l + 2));
                l = a.indexOf("/"); - 1 === l && (l = a.length);
                b = a.substring(0, l);
                e = "";
                a = a.substring(l).split("/");
                for (l = 0; l < a.length; l++) if (0 < a[l].length) {
                        var n = a[l];
                        try {
                            n = decodeURIComponent(n.replace(/\+/g, " "))
                        } catch (u) {}
                        e += "/" + n
                    }
                a = b.split(".");
                3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
                l = b.indexOf(":");
                0 <= l && (f = "https" === g || "wss" === g, k = b.substring(l + 1), isFinite(k) &&
                    (k = String(k)), k = p(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN)
            }
            return {
                host: b,
                port: k,
                domain: c,
                he: d,
                ab: f,
                scheme: g,
                yb: e
            }
        }
        function qd(a) {
            return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
        }
        function wa(a, b) {
            if (a === b) return 0;
            if ("[MIN_NAME]" === a || "[MAX_NAME]" === b) return -1;
            if ("[MIN_NAME]" === b || "[MAX_NAME]" === a) return 1;
            var c = rd(a),
                d = rd(b);
            return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -
                1 : 1
        }

        function sd(a) {
            if ("object" !== typeof a || null === a) return G(a);
            var b = [],
                c;
            for (c in a) b.push(c);
            b.sort();
            c = "{";
            for (var d = 0; d < b.length; d++) 0 !== d && (c += ","), c += G(b[d]), c += ":", c += sd(a[b[d]]);
            return c + "}"
        }
        function td(a, b) {
            if (ea(a)) for (var c = 0; c < a.length; ++c) b(c, a[c]);
            else P(a, b)
        }

        function ud(a) {
            C(!qd(a), "Invalid JSON number");
            var b, c, d, e;
            0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -
                1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(
                2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
            e = [];
            for (a = 52; a; --a) e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
            for (a = 11; a; --a) e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
            e.push(b ? 1 : 0);
            e.reverse();
            b = e.join("");
            c = "";
            for (a = 0; 64 > a; a += 8) d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
                    (d = "0" + d), c += d;
            return c.toLowerCase()
        }
        var vd = /^-?\d{1,10}$/;

        function rd(a) {
            return vd.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null
        }
        function gb(a) {
            try {
                a()
            } catch (b) {
                setTimeout(function () {
                    S("Exception was thrown by user callback.", b.stack || "");
                    throw b;
                }, Math.floor(0))
            }
        }
        function T(a, b) {
            if (ga(a)) {
                var c = Array.prototype.slice.call(arguments, 1).slice();
                gb(function () {
                    a.apply(null, c)
                })
            }
        };

        function wd(a, b, c) {
            this.type = yd;
            this.source = a;
            this.path = b;
            this.children = c
        }
        wd.prototype.Pb = function (a) {
            if (this.path.j()) return a = this.children.subtree(new z(a)), a.j() ? null : a.value ? new sa(this.source,
                    t, a.value) : new wd(this.source, t, a);
            C(B(this.path) === a, "Can't get a merge for a child not on the path of the operation");
            return new wd(this.source, r(this.path), this.children)
        };
        wd.prototype.toString = function () {
            return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() +
                ")"
        };
        var ta = 0,
            yd = 1,
            oa = 2,
            ra = 3;

        function zd() {}
        zd.prototype.source;
        zd.prototype.type;
        zd.prototype.path;

        function Ad(a, b, c, d) {
            this.Hc = a;
            this.jd = b;
            this.$a = c;
            this.bd = d;
            C(!d || b, "Tagged queries must be from server.")
        }
        var pa = new Ad(!0, !1, null, !1),
            Bd = new Ad(!1, !0, null, !1);
        Ad.prototype.toString = function () {
            return this.Hc ? "user" : this.bd ? "server(queryID=" + this.$a + ")" : "server"
        };

        function Cd() {}
        Cd.f;
        var Dd = {};

        function Ed(a) {
            return q(a.compare, a)
        }
        Cd.prototype.fc = function (a, b) {
            return 0 !== this.compare(new w("[MIN_NAME]", a), new w("[MIN_NAME]", b))
        };
        Cd.prototype.Ob = function () {
            return Fd
        };

        function Gd(a) {
            this.f = a
        }
        la(Gd, Cd);
        h = Gd.prototype;
        h.Kb = function (a) {
            return !a.P(this.f).j()
        };
        h.compare = function (a, b) {
            var c = a.node.P(this.f),
                d = b.node.P(this.f),
                c = c.kb(d);
            return 0 === c ? wa(a.name, b.name) : c
        };
        h.Lb = function (a, b) {
            var c = D(a),
                c = O.T(this.f, c);
            return new w(b, c)
        };
        h.Mb = function () {
            var a = O.T(this.f, Hd);
            return new w("[MAX_NAME]", a)
        };
        h.toString = function () {
            return this.f
        };

        function Id() {}
        la(Id, Cd);
        h = Id.prototype;
        h.compare = function (a, b) {
            var c = a.node.J(),
                d = b.node.J(),
                c = c.kb(d);
            return 0 === c ? wa(a.name, b.name) : c
        };
        h.Kb = function (a) {
            return !a.J().j()
        };
        h.fc = function (a, b) {
            return !a.J().$(b.J())
        };
        h.Ob = function () {
            return Fd
        };
        h.Mb = function () {
            return new w("[MAX_NAME]", new Ma("[PRIORITY-POST]", Hd))
        };
        h.Lb = function (a, b) {
            var c = D(a);
            return new w(b, new Ma("[PRIORITY-POST]", c))
        };
        h.toString = function () {
            return ".priority"
        };
        var E = new Id;

        function Jd() {}
        la(Jd, Cd);
        h = Jd.prototype;
        h.compare = function (a, b) {
            return wa(a.name, b.name)
        };
        h.Kb = function () {
            throw gd("KeyIndex.isDefinedOn not expected to be called.");
        };
        h.fc = function () {
            return !1
        };
        h.Ob = function () {
            return Fd
        };
        h.Mb = function () {
            return new w("[MAX_NAME]", O)
        };
        h.Lb = function (a) {
            C(p(a), "KeyIndex indexValue must always be a string.");
            return new w(a, O)
        };
        h.toString = function () {
            return ".key"
        };
        var Kd = new Jd;

        function Ld() {}
        la(Ld, Cd);
        h = Ld.prototype;
        h.compare = function (a, b) {
            var c = a.node.kb(b.node);
            return 0 === c ? wa(a.name, b.name) : c
        };
        h.Kb = function () {
            return !0
        };
        h.fc = function (a, b) {
            return !a.$(b)
        };
        h.Ob = function () {
            return Fd
        };
        h.Mb = function () {
            return Md
        };
        h.Lb = function (a, b) {
            var c = D(a);
            return new w(b, c)
        };
        h.toString = function () {
            return ".value"
        };
        var Nd = new Ld;

        function Od(a, b) {
            this.f = a;
            this.sb = b
        }
        Od.prototype.get = function (a) {
            var b = J(this.f, a);
            if (!b) throw Error("No index defined for " + a);
            return b === Dd ? null : b
        };

        function Pd(a, b, c) {
            var d = ec(a.f, function (d, f) {
                var g = J(a.sb, f);
                C(g, "Missing index implementation for " + f);
                if (d === Dd) {
                    if (g.Kb(b.node)) {
                        for (var k = [], l = c.ob(ua), n = Q(l); n;) n.name != b.name && k.push(n), n = Q(l);
                        k.push(b);
                        return Qd(k, Ed(g))
                    }
                    return Dd
                }
                g = c.get(b.name);
                k = d;
                g && (k = k.remove(new w(b.name, g)));
                return k.Ea(b, b.node)
            });
            return new Od(d, a.sb)
        }

        function Rd(a, b, c) {
            var d = ec(a.f, function (a) {
                if (a === Dd) return a;
                var d = c.get(b.name);
                return d ? a.remove(new w(b.name, d)) : a
            });
            return new Od(d, a.sb)
        }
        var Sd = new Od({
            ".priority": Dd
        }, {
            ".priority": E
        });

        function Ma(a, b) {
            this.K = a;
            C(m(this.K) && null !== this.K, "LeafNode shouldn't be created with null/undefined value.");
            this.fa = b || O;
            Td(this.fa);
            this.f = null
        }
        h = Ma.prototype;
        h.R = function () {
            return !0
        };
        h.J = function () {
            return this.fa
        };
        h.ba = function (a) {
            return new Ma(this.K, a)
        };
        h.P = function (a) {
            return ".priority" === a ? this.fa : O
        };
        h.ia = function (a) {
            return a.j() ? this : ".priority" === B(a) ? this.fa : O
        };
        h.wa = function () {
            return !1
        };
        h.Lc = function () {
            return null
        };
        h.T = function (a, b) {
            return ".priority" === a ? this.ba(b) : b.j() && ".priority" !== a ? this : O.T(a, b).ba(this.fa)
        };
        h.M = function (a, b) {
            var c = B(a);
            if (null === c) return b;
            if (b.j() && ".priority" !== c) return this;
            C(".priority" !== c || 1 === Ba(a), ".priority must be the last token in a path");
            return this.T(c, O.M(r(a), b))
        };
        h.j = function () {
            return !1
        };
        h.Qa = function () {
            return 0
        };
        h.N = function (a) {
            return a && !this.J().j() ? {
                ".value": this.va(),
                ".priority": this.J().N()
            } : this.va()
        };
        h.hash = function () {
            if (null === this.f) {
                var a = "";
                this.fa.j() || (a += "priority:" + Ud(this.fa.N()) + ":");
                var b = typeof this.K,
                    a = a + (b + ":"),
                    a = "number" === b ? a + ud(this.K) : a + this.K;
                this.f = jd(a)
            }
            return this.f
        };
        h.va = function () {
            return this.K
        };
        h.kb = function (a) {
            if (a === O) return 1;
            if (a instanceof Vd) return -1;
            C(a.R(), "Unknown node type");
            var b = typeof a.K,
                c = typeof this.K,
                d = yb(Wd, b),
                e = yb(Wd, c);
            C(0 <= d, "Unknown leaf type: " + b);
            C(0 <= e, "Unknown leaf type: " + c);
            return d === e ? "object" === c ? 0 : this.K < a.K ? -1 : this.K === a.K ? 0 : 1 : e - d
        };
        var Wd = ["object", "boolean", "number", "string"];
        Ma.prototype.La = function () {
            return this
        };
        Ma.prototype.ub = function () {
            return !0
        };
        Ma.prototype.$ = function (a) {
            return a === this ? !0 : a.R() ? this.K === a.K && this.fa.$(a.fa) : !1
        };
        Ma.prototype.toString = function () {
            return G(this.N(!0))
        };

        function Vd(a, b, c) {
            this.C = a;
            (this.fa = b) && Td(this.fa);
            a.j() && C(!this.fa || this.fa.j(), "An empty node cannot have a priority");
            this.f = c;
            this.g = null
        }
        h = Vd.prototype;
        h.R = function () {
            return !1
        };
        h.J = function () {
            return this.fa || O
        };
        h.ba = function (a) {
            return this.C.j() ? this : new Vd(this.C, a, this.f)
        };
        h.P = function (a) {
            if (".priority" === a) return this.J();
            a = this.C.get(a);
            return null === a ? O : a
        };
        h.ia = function (a) {
            var b = B(a);
            return null === b ? this : this.P(b).ia(r(a))
        };
        h.wa = function (a) {
            return null !== this.C.get(a)
        };
        h.T = function (a, b) {
            C(b, "We should always be passing snapshot nodes");
            if (".priority" === a) return this.ba(b);
            var c = new w(a, b),
                d, e;
            b.j() ? (d = this.C.remove(a), c = Rd(this.f, c, this.C)) : (d = this.C.Ea(a, b), c = Pd(this.f, c, this.C));
            e = d.j() ? O : this.fa;
            return new Vd(d, e, c)
        };
        h.M = function (a, b) {
            var c = B(a);
            if (null === c) return b;
            C(".priority" !== B(a) || 1 === Ba(a), ".priority must be the last token in a path");
            var d = this.P(c).M(r(a), b);
            return this.T(c, d)
        };
        h.j = function () {
            return this.C.j()
        };
        h.Qa = function () {
            return this.C.count()
        };
        var Xd = /^(0|[1-9]\d*)$/;
        h = Vd.prototype;
        h.N = function (a) {
            if (this.j()) return null;
            var b = {}, c = 0,
                d = 0,
                e = !0;
            this.X(E, function (f, g) {
                b[f] = g.N(a);
                c++;
                e && Xd.test(f) ? d = Math.max(d, Number(f)) : e = !1
            });
            if (!a && e && d < 2 * c) {
                var f = [],
                    g;
                for (g in b) f[g] = b[g];
                return f
            }
            a && !this.J().j() && (b[".priority"] = this.J().N());
            return b
        };
        h.hash = function () {
            if (null === this.g) {
                var a = "";
                this.J().j() || (a += "priority:" + Ud(this.J().N()) + ":");
                this.X(E, function (b, c) {
                    var d = c.hash();
                    "" !== d && (a += ":" + b + ":" + d)
                });
                this.g = "" === a ? "" : jd(a)
            }
            return this.g
        };
        h.Lc = function (a, b, c) {
            return (c = Yd(this, c)) ? (a = Gc(c, new w(a, b))) ? a.name : null : Gc(this.C, a)
        };

        function Zd(a, b) {
            var c;
            c = (c = Yd(a, b)) ? (c = c.Nb()) && c.name : a.C.Nb();
            return c ? new w(c, a.C.get(c)) : null
        }
        function $d(a, b) {
            var c;
            c = (c = Yd(a, b)) ? (c = c.vb()) && c.name : a.C.vb();
            return c ? new w(c, a.C.get(c)) : null
        }
        h.X = function (a, b) {
            var c = Yd(this, a);
            return c ? c.ja(function (a) {
                return b(a.name, a.node)
            }) : this.C.ja(b)
        };
        h.ob = function (a) {
            return this.pb(a.Ob(), a)
        };
        h.pb = function (a, b) {
            var c = Yd(this, b);
            if (c) return c.pb(a, function (a) {
                    return a
                });
            for (var c = this.C.pb(a.name, ua), d = Ic(c); null != d && 0 > b.compare(d, a);) Q(c), d = Ic(c);
            return c
        };
        h.ld = function (a) {
            return this.qb(a.Mb(), a)
        };
        h.qb = function (a, b) {
            var c = Yd(this, b);
            if (c) return c.qb(a, function (a) {
                    return a
                });
            for (var c = this.C.qb(a.name, ua), d = Ic(c); null != d && 0 < b.compare(d, a);) Q(c), d = Ic(c);
            return c
        };
        h.kb = function (a) {
            return this.j() ? a.j() ? 0 : -1 : a.R() || a.j() ? 1 : a === Hd ? -1 : 0
        };
        h.La = function (a) {
            if (a === Kd || lc(this.f.sb, a.toString())) return this;
            var b = this.f,
                c = this.C;
            C(a !== Kd, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
            for (var d = [], e = !1, c = c.ob(ua), f = Q(c); f;) e = e || a.Kb(f.node), d.push(f), f = Q(c);
            var g;
            e ? g = Qd(d, Ed(a)) : g = Dd;
            d = a.toString();
            e = za(b.sb);
            e[d] = a;
            a = za(b.f);
            a[d] = g;
            return new Vd(this.C, this.fa, new Od(a, e))
        };
        h.ub = function (a) {
            return a === Kd || lc(this.f.sb, a.toString())
        };
        h.$ = function (a) {
            if (a === this) return !0;
            if (a.R()) return !1;
            if (this.J().$(a.J()) && this.C.count() === a.C.count()) {
                var b = this.ob(E);
                a = a.ob(E);
                for (var c = Q(b), d = Q(a); c && d;) {
                    if (c.name !== d.name || !c.node.$(d.node)) return !1;
                    c = Q(b);
                    d = Q(a)
                }
                return null === c && null === d
            }
            return !1
        };

        function Yd(a, b) {
            return b === Kd ? null : a.f.get(b.toString())
        }
        h.toString = function () {
            return G(this.N(!0))
        };

        function D(a, b) {
            if (null === a) return O;
            var c = null;
            "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
            C(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c,
                "Invalid priority type found: " + typeof c);
            "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
            if ("object" !== typeof a || ".sv" in a) return new Ma(a, D(c));
            if (a instanceof Array) {
                var d = O,
                    e = a;
                P(e, function (a, b) {
                    if (x(e, b) && "." !== b.substring(0, 1)) {
                        var c = D(a);
                        if (c.R() || !c.j()) d =
                                d.T(b, c)
                    }
                });
                return d.ba(D(c))
            }
            var f = [],
                g = !1,
                k = a;
            lb(k, function (a) {
                if ("string" !== typeof a || "." !== a.substring(0, 1)) {
                    var b = D(k[a]);
                    b.j() || (g = g || !b.J().j(), f.push(new w(a, b)))
                }
            });
            if (0 == f.length) return O;
            var l = Qd(f, va, function (a) {
                return a.name
            }, xa);
            if (g) {
                var n = Qd(f, Ed(E));
                return new Vd(l, D(c), new Od({
                    ".priority": n
                }, {
                    ".priority": E
                }))
            }
            return new Vd(l, D(c), Sd)
        }
        var ae = Math.log(2);

        function be(a) {
            this.count = parseInt(Math.log(a + 1) / ae, 10);
            this.fd = this.count - 1;
            this.Md = a + 1 & parseInt(Array(this.count + 1).join("1"), 2)
        }
        function ce(a) {
            var b = !(a.Md & 1 << a.fd);
            a.fd--;
            return b
        }

        function Qd(a, b, c, d) {
            function e(b, d) {
                var f = d - b;
                if (0 == f) return null;
                if (1 == f) {
                    var n = a[b],
                        u = c ? c(n) : n;
                    return new Jc(u, n.node, Fc, null, null)
                }
                var n = parseInt(f / 2, 10) + b,
                    f = e(b, n),
                    y = e(n + 1, d),
                    n = a[n],
                    u = c ? c(n) : n;
                return new Jc(u, n.node, Fc, f, y)
            }
            a.sort(b);
            var f = function (b) {
                function d(b, g) {
                    var k = u - b,
                        y = u;
                    u -= b;
                    var y = e(k + 1, y),
                        k = a[k],
                        H = c ? c(k) : k,
                        y = new Jc(H, k.node, g, null, y);
                    f ? f.left = y : n = y;
                    f = y
                }
                for (var f = null, n = null, u = a.length, y = 0; y < b.count; ++y) {
                    var H = ce(b),
                        xd = Math.pow(2, b.count - (y + 1));
                    H ? d(xd, Fc) : (d(xd, Fc), d(xd, Kc))
                }
                return n
            }(new be(a.length));
            return null !== f ? new Dc(d || b, f) : new Dc(d || b)
        }
        function Ud(a) {
            return "number" === typeof a ? "number:" + ud(a) : "string:" + a
        }
        function Td(a) {
            if (a.R()) {
                var b = a.N();
                C("string" === typeof b || "number" === typeof b || "object" === typeof b && x(b, ".sv"),
                    "Priority must be a string or number.")
            } else C(a === Hd || a.j(), "priority of unexpected type.");
            C(a === Hd || a.J().j(), "Priority nodes can't have a priority of their own.")
        }
        var O = new Vd(new Dc(xa), null, Sd);

        function de() {
            Vd.call(this, new Dc(xa), O, Sd)
        }
        la(de, Vd);
        h = de.prototype;
        h.kb = function (a) {
            return a === this ? 0 : 1
        };
        h.$ = function (a) {
            return a === this
        };
        h.J = function () {
            return this
        };
        h.P = function () {
            return O
        };
        h.j = function () {
            return !1
        };
        var Hd = new de,
            Fd = new w("[MIN_NAME]", O),
            Md = new w("[MAX_NAME]", Hd);

        function ee() {
            this.set = {}
        }
        h = ee.prototype;
        h.add = function (a, b) {
            this.set[a] = null !== b ? b : !0
        };
        h.contains = function (a) {
            return x(this.set, a)
        };
        h.get = function (a) {
            return this.contains(a) ? this.set[a] : void 0
        };
        h.remove = function (a) {
            delete this.set[a]
        };
        h.j = function () {
            return Wb(this.set)
        };
        h.count = function () {
            return gc(this.set)
        };

        function fe(a, b) {
            P(a.set, function (a, d) {
                b(d, a)
            })
        };

        function Ja() {
            this.C = this.K = null
        }
        Ja.prototype.find = function (a) {
            if (null != this.K) return this.K.ia(a);
            if (a.j() || null == this.C) return null;
            var b = B(a);
            a = r(a);
            return this.C.contains(b) ? this.C.get(b).find(a) : null
        };
        Ja.prototype.Ab = function (a, b) {
            if (a.j()) this.K = b, this.C = null;
            else if (null !== this.K) this.K = this.K.M(a, b);
            else {
                null == this.C && (this.C = new ee);
                var c = B(a);
                this.C.contains(c) || this.C.add(c, new Ja);
                c = this.C.get(c);
                a = r(a);
                c.Ab(a, b)
            }
        };

        function ge(a, b) {
            if (b.j()) return a.K = null, a.C = null, !0;
            if (null !== a.K) {
                if (a.K.R()) return !1;
                var c = a.K;
                a.K = null;
                c.X(E, function (b, c) {
                    a.Ab(new z(b), c)
                });
                return ge(a, b)
            }
            return null !== a.C ? (c = B(b), b = r(b), a.C.contains(c) && ge(a.C.get(c), b) && a.C.remove(c), a.C.j() ?
                (a.C = null, !0) : !1) : !0
        }
        function Ka(a, b, c) {
            null !== a.K ? c(b, a.K) : a.X(function (a, e) {
                var f = new z(b.toString() + "/" + a);
                Ka(e, f, c)
            })
        }
        Ja.prototype.X = function (a) {
            null !== this.C && fe(this.C, function (b, c) {
                a(b, c)
            })
        };

        function he(a) {
            C(ea(a) && 0 < a.length, "Requires a non-empty array");
            this.sa = a;
            this.m = {}
        }
        he.prototype.B = function (a, b) {
            for (var c = this.m[a] || [], d = 0; d < c.length; d++) c[d].Ib.apply(c[d].context, Array.prototype.slice.call(
                    arguments, 1))
        };
        he.prototype.Za = function (a, b, c) {
            ie(this, a);
            this.m[a] = this.m[a] || [];
            this.m[a].push({
                Ib: b,
                context: c
            });
            (a = this.Kc(a)) && b.apply(c, a)
        };
        he.prototype.xb = function (a, b, c) {
            ie(this, a);
            a = this.m[a] || [];
            for (var d = 0; d < a.length; d++) if (a[d].Ib === b && (!c || c === a[d].context)) {
                    a.splice(d, 1);
                    break
                }
        };

        function ie(a, b) {
            C(tc(a.sa, function (a) {
                return a === b
            }), "Unknown event: " + b)
        };

        function je(a, b) {
            this.value = a;
            this.children = b || ke
        }
        var ke = new Dc(function (a, b) {
            return a === b ? 0 : a < b ? -1 : 1
        });

        function le(a) {
            var b = me;
            P(a, function (a, d) {
                b = b.set(new z(d), a)
            });
            return b
        }
        h = je.prototype;
        h.j = function () {
            return null === this.value && this.children.j()
        };

        function ne(a, b, c) {
            if (null != a.value && c(a.value)) return {
                    path: t,
                    value: a.value
            };
            if (b.j()) return null;
            var d = B(b);
            a = a.children.get(d);
            return null !== a ? (b = ne(a, r(b), c), null != b ? {
                path: (new z(d)).G(b.path),
                value: b.value
            } : null) : null
        }

        function oe(a, b) {
            return ne(a, b, function () {
                return !0
            })
        }
        h.subtree = function (a) {
            if (a.j()) return this;
            var b = this.children.get(B(a));
            return null !== b ? b.subtree(r(a)) : me
        };
        h.set = function (a, b) {
            if (a.j()) return new je(b, this.children);
            var c = B(a),
                d = (this.children.get(c) || me).set(r(a), b),
                c = this.children.Ea(c, d);
            return new je(this.value, c)
        };
        h.remove = function (a) {
            if (a.j()) return this.children.j() ? me : new je(null, this.children);
            var b = B(a),
                c = this.children.get(b);
            return c ? (a = c.remove(r(a)), b = a.j() ? this.children.remove(b) : this.children.Ea(b, a), null === this
                .value && b.j() ? me : new je(this.value, b)) : this
        };
        h.get = function (a) {
            if (a.j()) return this.value;
            var b = this.children.get(B(a));
            return b ? b.get(r(a)) : null
        };

        function pe(a, b, c) {
            if (b.j()) return c;
            var d = B(b);
            b = pe(a.children.get(d) || me, r(b), c);
            d = b.j() ? a.children.remove(d) : a.children.Ea(d, b);
            return new je(a.value, d)
        }
        function qe(a, b) {
            return re(a, t, b)
        }
        function re(a, b, c) {
            var d = {};
            a.children.ja(function (a, f) {
                d[a] = re(f, b.G(a), c)
            });
            return c(b, a.value, d)
        }
        function se(a, b, c) {
            return te(a, b, t, c)
        }
        function te(a, b, c, d) {
            var e = a.value ? d(c, a.value) : !1;
            if (e) return e;
            if (b.j()) return null;
            e = B(b);
            return (a = a.children.get(e)) ? te(a, r(b), c.G(e), d) : null
        }

        function ue(a, b, c) {
            var d = t;
            if (!b.j()) {
                var e = !0;
                a.value && (e = c(d, a.value));
                !0 === e && (e = B(b), (a = a.children.get(e)) && ve(a, r(b), d.G(e), c))
            }
        }
        function ve(a, b, c, d) {
            if (b.j()) return a;
            a.value && d(c, a.value);
            var e = B(b);
            return (a = a.children.get(e)) ? ve(a, r(b), c.G(e), d) : me
        }
        function we(a, b) {
            xe(a, t, b)
        }
        function xe(a, b, c) {
            a.children.ja(function (a, e) {
                xe(e, b.G(a), c)
            });
            a.value && c(b, a.value)
        }
        function ye(a, b) {
            a.children.ja(function (a, d) {
                d.value && b(a, d.value)
            })
        }
        var me = new je(null);
        je.prototype.toString = function () {
            var a = {};
            we(this, function (b, c) {
                a[b.toString()] = c.toString()
            });
            return G(a)
        };

        function ze(a) {
            this.Y = a
        }
        var Ae = new ze(new je(null));

        function Be(a, b, c) {
            if (b.j()) return new ze(new je(c));
            var d = oe(a.Y, b);
            if (null != d) {
                var e = d.path,
                    d = d.value;
                b = A(e, b);
                d = d.M(b, c);
                return new ze(a.Y.set(e, d))
            }
            a = pe(a.Y, b, new je(c));
            return new ze(a)
        }
        function Ce(a, b, c) {
            var d = a;
            lb(c, function (a, c) {
                d = Be(d, b.G(a), c)
            });
            return d
        }
        ze.prototype.lc = function (a) {
            if (a.j()) return Ae;
            a = pe(this.Y, a, me);
            return new ze(a)
        };

        function De(a, b) {
            var c = oe(a.Y, b);
            return null != c ? a.Y.get(c.path).ia(A(c.path, b)) : null
        }

        function Ee(a) {
            var b = [],
                c = a.Y.value;
            null != c ? c.R() || c.X(E, function (a, c) {
                b.push(new w(a, c))
            }) : a.Y.children.ja(function (a, c) {
                null != c.value && b.push(new w(a, c.value))
            });
            return b
        }
        function Fe(a, b) {
            if (b.j()) return a;
            var c = De(a, b);
            return null != c ? new ze(new je(c)) : new ze(a.Y.subtree(b))
        }
        ze.prototype.j = function () {
            return this.Y.j()
        };
        ze.prototype.apply = function (a) {
            return Ge(t, this.Y, a)
        };

        function Ge(a, b, c) {
            if (null != b.value) return c.M(a, b.value);
            var d = null;
            b.children.ja(function (b, f) {
                ".priority" === b ? (C(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c =
                    Ge(a.G(b), f, c)
            });
            c.ia(a).j() || null === d || (c = c.M(a.G(".priority"), d));
            return c
        };
        ma.pe;

        function He() {
            this.f = Ae;
            this.g = [];
            this.m = -1
        }
        h = He.prototype;
        h.lc = function (a) {
            var b = uc(this.g, function (b) {
                return b.uc === a
            });
            C(0 <= b, "removeWrite called with nonexistent writeId.");
            var c = this.g[b];
            this.g.splice(b, 1);
            for (var d = c.visible, e = !1, f = this.g.length - 1; d && 0 <= f;) {
                var g = this.g[f];
                g.visible && (f >= b && Ie(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
                f--
            }
            if (d) {
                if (e) this.f = Je(this.g, Ke, t), 0 < this.g.length ? this.m = this.g[this.g.length - 1].uc : this.m = -
                        1;
                else if (c.Ba) this.f = this.f.lc(c.path);
                else {
                    var k = this;
                    P(c.children, function (a, b) {
                        k.f = k.f.lc(c.path.G(b))
                    })
                }
                return c.path
            }
            return null
        };
        h.qa = function (a, b, c, d) {
            if (c || d) {
                var e = Fe(this.f, a);
                return !d && e.j() ? b : d || null != b || null != De(e, t) ? (e = Je(this.g, function (b) {
                    return (b.visible || d) && (!c || !(0 <= yb(c, b.uc))) && (b.path.contains(a) || a.contains(b.path))
                }, a), b = b || O, e.apply(b)) : null
            }
            e = De(this.f, a);
            if (null != e) return e;
            e = Fe(this.f, a);
            return e.j() ? b : null != b || null != De(e, t) ? (b = b || O, e.apply(b)) : null
        };
        h.Hb = function (a, b) {
            var c = O,
                d = De(this.f, a);
            if (d) d.R() || d.X(E, function (a, b) {
                    c = c.T(a, b)
                });
            else if (b) {
                var e = Fe(this.f, a);
                b.X(E, function (a, b) {
                    var d = Fe(e, new z(a)).apply(b);
                    c = c.T(a, d)
                });
                Kb(Ee(e), function (a) {
                    c = c.T(a.name, a.node)
                })
            } else e = Fe(this.f, a), Kb(Ee(e), function (a) {
                    c = c.T(a.name, a.node)
                });
            return c
        };
        h.Sb = function (a, b, c, d) {
            C(c || d, "Either existingEventSnap or existingServerSnap must exist");
            a = a.G(b);
            if (null != De(this.f, a)) return null;
            a = Fe(this.f, a);
            return a.j() ? d.ia(b) : a.apply(d.ia(b))
        };
        h.Ia = function (a, b, c) {
            a = a.G(b);
            var d = De(this.f, a);
            return null != d ? d : Pa(c, b) ? Fe(this.f, a).apply(c.o().P(b)) : null
        };
        h.Db = function (a) {
            return De(this.f, a)
        };
        h.zc = function (a, b, c, d, e, f) {
            var g;
            a = Fe(this.f, a);
            g = De(a, t);
            if (null == g) if (null != b) g = a.apply(b);
                else return [];
            g = g.La(f);
            if (g.j() || g.R()) return [];
            b = [];
            a = Ed(f);
            e = e ? g.qb(c, f) : g.pb(c, f);
            for (f = Q(e); f && b.length < d;) 0 !== a(f, c) && b.push(f), f = Q(e);
            return b
        };

        function Ie(a, b) {
            return a.Ba ? a.path.contains(b) : !! mc(a.children, function (c, d) {
                return a.path.G(d).contains(b)
            })
        }
        function Ke(a) {
            return a.visible
        }

        function Je(a, b, c) {
            for (var d = Ae, e = 0; e < a.length; ++e) {
                var f = a[e];
                if (b(f)) {
                    var g = f.path;
                    if (f.Ba) c.contains(g) ? (g = A(c, g), d = Be(d, g, f.Ba)) : g.contains(c) && (g = A(g, c), d = Be(
                            d, t, f.Ba.ia(g)));
                    else if (f.children) if (c.contains(g)) g = A(c, g), d = Ce(d, g, f.children);
                        else {
                            if (g.contains(c)) if (g = A(g, c), g.j()) d = Ce(d, t, f.children);
                                else if (f = J(f.children, B(g))) f = f.ia(r(g)), d = Be(d, t, f)
                        } else throw gd("WriteRecord should have .snap or .children");
                }
            }
            return d
        }
        function Le(a, b) {
            this.eb = a;
            this.Y = b
        }
        h = Le.prototype;
        h.qa = function (a, b, c) {
            return this.Y.qa(this.eb, a, b, c)
        };
        h.Hb = function (a) {
            return this.Y.Hb(this.eb, a)
        };
        h.Sb = function (a, b, c) {
            return this.Y.Sb(this.eb, a, b, c)
        };
        h.Db = function (a) {
            return this.Y.Db(this.eb.G(a))
        };
        h.zc = function (a, b, c, d, e) {
            return this.Y.zc(this.eb, a, b, c, d, e)
        };
        h.Ia = function (a, b) {
            return this.Y.Ia(this.eb, a, b)
        };
        h.G = function (a) {
            return new Le(this.eb.G(a), this.Y)
        };

        function Me() {
            he.call(this, ["online"]);
            this.f = !0;
            if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
                var a = this;
                window.addEventListener("online", function () {
                    a.f || (a.f = !0, a.B("online", !0))
                }, !1);
                window.addEventListener("offline", function () {
                    a.f && (a.f = !1, a.B("online", !1))
                }, !1)
            }
        }
        la(Me, he);
        Me.prototype.Kc = function (a) {
            C("online" === a, "Unknown event type: " + a);
            return [this.f]
        };
        ca(Me);

        function Ne() {
            this.children = {};
            this.Cc = 0;
            this.value = null
        }
        function Oe(a, b, c) {
            this.m = a ? a : "";
            this.g = b ? b : null;
            this.f = c ? c : new Ne
        }
        function Pe(a, b) {
            for (var c = b instanceof z ? b : new z(b), d = a, e; null !== (e = B(c));) d = new Oe(e, d, J(d.f.children,
                    e) || new Ne), c = r(c);
            return d
        }
        h = Oe.prototype;
        h.va = function () {
            return this.f.value
        };

        function Qe(a, b) {
            C("undefined" !== typeof b, "Cannot set value to undefined");
            a.f.value = b;
            Re(a)
        }
        h.dc = function () {
            return 0 < this.f.Cc
        };
        h.j = function () {
            return null === this.va() && !this.dc()
        };
        h.X = function (a) {
            var b = this;
            P(this.f.children, function (c, d) {
                a(new Oe(d, b, c))
            })
        };

        function Se(a, b, c, d) {
            c && !d && b(a);
            a.X(function (a) {
                Se(a, b, !0, d)
            });
            c && d && b(a)
        }
        function Te(a, b) {
            for (var c = a.parent(); null !== c && !b(c);) c = c.parent()
        }
        h.path = function () {
            return new z(null === this.g ? this.m : this.g.path() + "/" + this.m)
        };
        h.name = function () {
            return this.m
        };
        h.parent = function () {
            return this.g
        };

        function Re(a) {
            if (null !== a.g) {
                var b = a.g,
                    c = a.m,
                    d = a.j(),
                    e = x(b.f.children, c);
                d && e ? (delete b.f.children[c], b.f.Cc--, Re(b)) : d || e || (b.f.children[c] = a.f, b.f.Cc++, Re(b))
            }
        };

        function Ue() {
            he.call(this, ["visible"]);
            var a, b;
            "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !==
                typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ?
                (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b =
                "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b =
                "webkitvisibilitychange", a = "webkitHidden"));
            this.ca = !0;
            if (b) {
                var c = this;
                document.addEventListener(b, function () {
                    var b = !document[a];
                    b !== c.ca && (c.ca = b, c.B("visible", b))
                }, !1)
            }
        }
        la(Ue, he);
        Ue.prototype.Kc = function (a) {
            C("visible" === a, "Unknown event type: " + a);
            return [this.ca]
        };
        ca(Ue);
        var Ve = function () {
            var a = 0,
                b = [];
            return function (c) {
                var d = c === a;
                a = c;
                for (var e = Array(8), f = 7; 0 <= f; f--) e[f] =
                        "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(
                        c / 64);
                C(0 === c, "Cannot push at time == 0");
                c = e.join("");
                if (d) {
                    for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
                    b[f]++
                } else for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
                for (f = 0; 12 > f; f++) c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(
                        b[f]);
                C(20 === c.length, "nextPushId: Length should be 20.");
                return c
            }
        }();

        function We() {
            this.f = {}
        }

        function Xe(a, b) {
            var c = b.type,
                d = b.Ja;
            C("child_added" == c || "child_changed" == c || "child_removed" == c,
                "Only child changes supported for tracking");
            C(".priority" !== d, "Only non-priority child changes can be tracked.");
            var e = J(a.f, d);
            if (e) {
                var f = e.type;
                if ("child_added" == c && "child_removed" == f) a.f[d] = new F("child_changed", b.Ca, d, e.Ca);
                else if ("child_removed" == c && "child_added" == f) delete a.f[d];
                else if ("child_removed" == c && "child_changed" == f) a.f[d] = new F("child_removed", e.Rc, d);
                else if ("child_changed" == c && "child_added" ==
                    f) a.f[d] = new F("child_added", b.Ca, d);
                else if ("child_changed" == c && "child_changed" == f) a.f[d] = new F("child_changed", b.Ca, d, e.Rc);
                else throw gd("Illegal combination of changes: " + b + " occurred after " + e);
            } else a.f[d] = b
        };

        function Ye(a) {
            this.g = a;
            this.w = a.F.V()
        }
        function Ze(a, b, c, d) {
            var e = [],
                f = [];
            Kb(b, function (b) {
                "child_changed" === b.type && a.w.fc(b.Rc, b.Ca) && f.push(new F("child_moved", b.Ca, b.Ja))
            });
            $e(a, e, "child_removed", b, d, c);
            $e(a, e, "child_added", b, d, c);
            $e(a, e, "child_moved", f, d, c);
            $e(a, e, "child_changed", b, d, c);
            $e(a, e, Ra, b, d, c);
            return e
        }
        function $e(a, b, c, d, e, f) {
            d = pc(d, function (a) {
                return a.type === c
            });
            wc(d, q(a.f, a));
            Kb(d, function (c) {
                var d = af(a, c, f);
                Kb(e, function (e) {
                    e.Wc(c.type) && b.push(e.createEvent(d, a.g))
                })
            })
        }

        function af(a, b, c) {
            "value" !== b.type && "child_removed" !== b.type && (b.kc = c.Lc(b.Ja, b.Ca, a.w));
            return b
        }
        Ye.prototype.f = function (a, b) {
            if (null == a.Ja || null == b.Ja) throw gd("Should only compare child_ events.");
            return this.w.compare(new w(a.Ja, a.Ca), new w(b.Ja, b.Ca))
        };

        function bf() {}
        bf.prototype.Wc;
        bf.prototype.createEvent;
        bf.prototype.Pa;
        bf.prototype.Dc;
        bf.prototype.matches;
        bf.prototype.Mc;

        function cf(a, b, c) {
            this.ib = a;
            this.Sa = b;
            this.Ta = c || null
        }
        h = cf.prototype;
        h.Wc = function (a) {
            return "value" === a
        };
        h.createEvent = function (a, b) {
            var c = b.F.V();
            return new Xa("value", this, new U(a.Ca, b.zb(), c))
        };
        h.Pa = function (a) {
            var b = this.Ta;
            if ("cancel" === a.cc()) {
                C(this.Sa, "Raising a cancel event on a listener with no cancel callback");
                var c = this.Sa;
                return function () {
                    c.call(b, a.error)
                }
            }
            var d = this.ib;
            return function () {
                d.call(b, a.nc)
            }
        };
        h.Dc = function (a, b) {
            return this.Sa ? new Ya(this, a, b) : null
        };
        h.matches = function (a) {
            return a instanceof cf ? a.ib && this.ib ? a.ib === this.ib && a.Ta === this.Ta : !0 : !1
        };
        h.Mc = function () {
            return null !== this.ib
        };

        function df(a, b, c) {
            this.ha = a;
            this.Sa = b;
            this.Ta = c
        }
        h = df.prototype;
        h.Wc = function (a) {
            a = "children_added" === a ? "child_added" : a;
            return kc(this.ha, "children_removed" === a ? "child_removed" : a)
        };
        h.Dc = function (a, b) {
            return this.Sa ? new Ya(this, a, b) : null
        };
        h.createEvent = function (a, b) {
            C(null != a.Ja, "Child events should have a childName.");
            var c = b.zb().G(a.Ja);
            return new Xa(a.type, this, new U(a.Ca, c, b.F.V()), a.kc)
        };
        h.Pa = function (a) {
            var b = this.Ta;
            if ("cancel" === a.cc()) {
                C(this.Sa, "Raising a cancel event on a listener with no cancel callback");
                var c = this.Sa;
                return function () {
                    c.call(b, a.error)
                }
            }
            var d = this.ha[a.ac];
            return function () {
                d.call(b, a.nc, a.kc)
            }
        };
        h.matches = function (a) {
            if (a instanceof df) {
                if (!this.ha || !a.ha) return !0;
                if (this.Ta === a.Ta) {
                    var b = gc(a.ha);
                    if (b === gc(this.ha)) {
                        if (1 === b) {
                            var b = hc(a.ha),
                                c = hc(this.ha);
                            return c === b && (!a.ha[b] || !this.ha[c] || a.ha[b] === this.ha[c])
                        }
                        return fc(this.ha, function (b, c) {
                            return a.ha[c] === b
                        })
                    }
                }
            }
            return !1
        };
        h.Mc = function () {
            return null !== this.ha
        };

        function ef(a, b) {
            this.L = a;
            this.f = b
        }
        function ff(a, b, c, d) {
            return new ef(new Na(b, c, d), a.f)
        }
        function gf(a) {
            return a.L.da ? a.L.o() : null
        }
        ef.prototype.H = function () {
            return this.f
        };

        function Va(a) {
            return a.f.da ? a.f.o() : null
        };

        function hf(a, b) {
            this.tc = a;
            this.Nd = b
        }
        function jf(a) {
            this.O = a
        }
        jf.prototype.Ma = function (a, b, c, d) {
            var e = new We,
                f;
            if (b.type === ta) b.source.Hc ? c = kf(this, a, b.path, b.Ba, c, d, e) : (C(b.source.jd, "Unknown source."),
                    f = b.source.bd, c = lf(this, a, b.path, b.Ba, c, d, f, e));
            else if (b.type === yd) b.source.Hc ? c = mf(this, a, b.path, b.children, c, d, e) : (C(b.source.jd,
                    "Unknown source."), f = b.source.bd, c = nf(this, a, b.path, b.children, c, d, f, e));
            else if (b.type === oa) if (b.Xc) if (f = b.path, null != c.Db(f)) c = a;
                    else {
                        b = new Ua(c, a, d);
                        d = a.L.o();
                        if (f.j() || ".priority" === B(f)) Oa(a.H()) ? b = c.qa(Va(a)) : (b = a.H().o(),
                                C(b instanceof Vd, "serverChildren would be complete if leaf node"), b = c.Hb(b)), b =
                                this.O.pa(d, b, e);
                        else {
                            f = B(f);
                            var g = c.Ia(f, a.H());
                            null == g && Pa(a.H(), f) && (g = d.P(f));
                            b = null != g ? this.O.M(d, f, g, b, e) : a.L.o().wa(f) ? this.O.M(d, f, O, b, e) : d;
                            b.j() && Oa(a.H()) && (d = c.qa(Va(a)), d.R() && (b = this.O.pa(b, d, e)))
                        }
                        d = Oa(a.H()) || null != c.Db(t);
                        c = ff(a, b, d, this.O.za())
                    } else c = of(this, a, b.path, c, d, e);
                    else if (b.type === ra) d = b.path, b = a.H(), f = b.o(), g = b.da || d.j(), c = pf(this, new ef(a.L,
                    new Na(f, g, b.mb)), d, c, Ta, e);
            else throw gd("Unknown operation type: " +
                    b.type);
            e = ic(e.f);
            d = c;
            b = d.L;
            b.da && (f = b.o().R() || b.o().j(), g = gf(a), (0 < e.length || !a.L.da || f && !b.o().$(g) || !b.o().J().$(
                g.J())) && e.push(Qa(gf(d))));
            return new hf(c, e)
        };

        function pf(a, b, c, d, e, f) {
            var g = b.L;
            if (null != d.Db(c)) return b;
            var k;
            if (c.j()) C(Oa(b.H()), "If change path is empty, we must have complete server data"), b.H().mb ? (e = Va(b),
                    d = d.Hb(e instanceof Vd ? e : O)) : d = d.qa(Va(b)), f = a.O.pa(b.L.o(), d, f);
            else {
                var l = B(c);
                if (".priority" == l) C(1 == Ba(c), "Can't have a priority with additional path components"), f = g.o(),
                        k = b.H().o(), d = d.Sb(c, f, k), f = null != d ? a.O.ba(f, d) : g.o();
                else {
                    var n = r(c);
                    Pa(g, l) ? (k = b.H().o(), d = d.Sb(c, g.o(), k), d = null != d ? g.o().P(l).M(n, d) : g.o().P(l)) :
                        d = d.Ia(l,
                        b.H());
                    f = null != d ? a.O.M(g.o(), l, d, e, f) : g.o()
                }
            }
            return ff(b, f, g.da || c.j(), a.O.za())
        }
        function lf(a, b, c, d, e, f, g, k) {
            var l = b.H();
            g = g ? a.O : a.O.nb();
            if (c.j()) d = g.pa(l.o(), d, null);
            else if (g.za() && !l.mb) d = l.o().M(c, d), d = g.pa(l.o(), d, null);
            else {
                var n = B(c);
                if ((c.j() ? !l.da || l.mb : !Pa(l, B(c))) && 1 < Ba(c)) return b;
                d = l.o().P(n).M(r(c), d);
                d = ".priority" == n ? g.ba(l.o(), d) : g.M(l.o(), n, d, Ta, null)
            }
            l = l.da || c.j();
            b = new ef(b.L, new Na(d, l, g.za()));
            return pf(a, b, c, e, new Ua(e, b, f), k)
        }

        function kf(a, b, c, d, e, f, g) {
            var k = b.L;
            e = new Ua(e, b, f);
            if (c.j()) d = a.O.pa(b.L.o(), d, g), a = ff(b, d, !0, a.O.za());
            else if (f = B(c), ".priority" === f) d = a.O.ba(b.L.o(), d), a = ff(b, d, k.da, k.mb);
            else {
                c = r(c);
                var l = k.o().P(f),
                    n;
                if (c.j()) n = d;
                else {
                    var u = e.kd(f);
                    null != u ? n = ".priority" === Ca(c) && u.ia(c.parent()).j() ? u : u.M(c, d) : n = O
                }
                l.$(n) ? a = b : (d = a.O.M(k.o(), f, n, e, g), a = ff(b, d, k.da, a.O.za()))
            }
            return a
        }

        function mf(a, b, c, d, e, f, g) {
            var k = b;
            we(d, function (d, n) {
                var u = c.G(d);
                Pa(b.L, B(u)) && (k = kf(a, k, u, n, e, f, g))
            });
            we(d, function (d, n) {
                var u = c.G(d);
                Pa(b.L, B(u)) || (k = kf(a, k, u, n, e, f, g))
            });
            return k
        }
        function qf(a, b) {
            we(b, function (b, d) {
                a = a.M(b, d)
            });
            return a
        }

        function nf(a, b, c, d, e, f, g, k) {
            if (b.H().o().j() && !Oa(b.H())) return b;
            var l = b;
            c = c.j() ? d : pe(me, c, d);
            var n = b.H().o();
            c.children.ja(function (c, d) {
                if (n.wa(c)) {
                    var H = b.H().o().P(c),
                        H = qf(H, d);
                    l = lf(a, l, new z(c), H, e, f, g, k)
                }
            });
            c.children.ja(function (c, d) {
                var H = !Oa(b.H()) && null == d.value;
                n.wa(c) || H || (H = b.H().o().P(c), H = qf(H, d), l = lf(a, l, new z(c), H, e, f, g, k))
            });
            return l
        }

        function of(a, b, c, d, e, f) {
            if (null != d.Db(c)) return b;
            var g = new Ua(d, b, e),
                k = e = b.L.o();
            if (Oa(b.H())) {
                if (c.j()) e = d.qa(Va(b)), k = a.O.pa(b.L.o(), e, f);
                else if (".priority" === B(c)) {
                    var l = d.Ia(B(c), b.H());
                    null == l || e.j() || e.J().$(l) || (k = a.O.ba(e, l))
                } else l = B(c), e = d.Ia(l, b.H()), null != e && (k = a.O.M(b.L.o(), l, e, g, f));
                e = !0
            } else if (b.L.da || c.j()) k = e, e = b.L.o(), e.R() || e.X(E, function (c) {
                    var e = d.Ia(c, b.H());
                    null != e && (k = a.O.M(k, c, e, g, f))
                }), e = b.L.da;
            else {
                l = B(c);
                if (1 == Ba(c) || Pa(b.L, l)) c = d.Ia(l, b.H()), null != c && (k = a.O.M(e, l,
                        c, g, f));
                e = !1
            }
            return ff(b, k, e, a.O.za())
        };

        function rf(a, b) {
            this.ya = a;
            var c = a.F,
                d = new sf(c.V()),
                c = tf(c) ? new sf(c.V()) : c.ka ? new uf(c) : new vf(c);
            this.g = new jf(c);
            var e = b.H(),
                f = b.L,
                g = d.pa(O, e.o(), null),
                k = c.pa(O, f.o(), null);
            this.Da = new ef(new Na(k, f.da, c.za()), new Na(g, e.da, d.za()));
            this.f = [];
            this.m = new Ye(a)
        }
        function wf(a) {
            return a.ya
        }
        h = rf.prototype;
        h.H = function () {
            return this.Da.H().o()
        };
        h.Oa = function (a) {
            var b = Va(this.Da);
            return b && (tf(this.ya.F) || !a.j() && !b.P(B(a)).j()) ? b.ia(a) : null
        };
        h.j = function () {
            return 0 === this.f.length
        };
        h.hb = function (a) {
            this.f.push(a)
        };
        h.Ra = function (a, b) {
            var c = [];
            if (b) {
                C(null == a, "A cancel should cancel all event registrations.");
                var d = this.ya.path;
                Kb(this.f, function (a) {
                    (a = a.Dc(b, d)) && c.push(a)
                })
            }
            if (a) {
                for (var e = [], f = 0; f < this.f.length; ++f) {
                    var g = this.f[f];
                    if (!g.matches(a)) e.push(g);
                    else if (a.Mc()) {
                        e = e.concat(this.f.slice(f + 1));
                        break
                    }
                }
                this.f = e
            } else this.f = [];
            return c
        };
        h.Ma = function (a, b, c) {
            a.type === yd && null !== a.source.$a && (C(Va(this.Da),
                "We should always have a full cache before handling merges"), C(gf(this.Da),
                "Missing event cache, even though we have a server cache"));
            var d = this.Da;
            a = this.g.Ma(d, a, b, c);
            b = this.g;
            c = a.tc;
            C(c.L.o().ub(b.O.V()), "Event snap not indexed");
            C(c.H().o().ub(b.O.V()), "Server snap not indexed");
            C(Oa(a.tc.H()) || !Oa(d.H()), "Once a server snap is complete, it should never go back");
            this.Da = a.tc;
            return xf(this, a.Nd, a.tc.L.o(), null)
        };

        function yf(a, b) {
            var c = a.Da.L,
                d = [];
            c.o().R() || c.o().X(E, function (a, b) {
                d.push(new F("child_added", b, a))
            });
            c.da && d.push(Qa(c.o()));
            return xf(a, d, c.o(), b)
        }
        function xf(a, b, c, d) {
            return Ze(a.m, b, c, d ? [d] : a.f)
        };

        function zf() {
            this.f = {}
        }
        h = zf.prototype;
        h.j = function () {
            return Wb(this.f)
        };
        h.Ma = function (a, b, c) {
            var d = a.source.$a;
            if (null !== d) return d = J(this.f, d), C(null != d, "SyncTree gave us an op for an invalid query."), d.Ma(
                    a, b, c);
            var e = [];
            P(this.f, function (d) {
                e = e.concat(d.Ma(a, b, c))
            });
            return e
        };
        h.hb = function (a, b, c, d, e) {
            var f = a.ra(),
                g = J(this.f, f);
            if (!g) {
                var g = c.qa(e ? d : null),
                    k = !1;
                g ? k = !0 : (d instanceof Vd ? g = c.Hb(d) : g = O, k = !1);
                g = new rf(a, new ef(new Na(g, k, !1), new Na(d, e, !1)));
                this.f[f] = g
            }
            g.hb(b);
            return yf(g, b)
        };
        h.Ra = function (a, b, c) {
            var d = a.ra(),
                e = [],
                f = [],
                g = null != Af(this);
            if ("default" === d) {
                var k = this;
                P(this.f, function (a, d) {
                    f = f.concat(a.Ra(b, c));
                    a.j() && (delete k.f[d], tf(a.ya.F) || e.push(a.ya))
                })
            } else {
                var l = J(this.f, d);
                l && (f = f.concat(l.Ra(b, c)), l.j() && (delete this.f[d], tf(l.ya.F) || e.push(l.ya)))
            }
            g && null == Af(this) && e.push(new V(a.A, a.path));
            return {
                de: e,
                Pd: f
            }
        };

        function Bf(a) {
            return pc(ic(a.f), function (a) {
                return !tf(a.ya.F)
            })
        }
        h.Oa = function (a) {
            var b = null;
            P(this.f, function (c) {
                b = b || c.Oa(a)
            });
            return b
        };

        function Cf(a, b) {
            if (tf(b.F)) return Af(a);
            var c = b.ra();
            return J(a.f, c)
        }
        function Af(a) {
            return nc(a.f, function (a) {
                return tf(a.ya.F)
            }) || null
        };
        ma.me;

        function Df(a) {
            this.f = me;
            this.g = new He;
            this.B = {};
            this.m = {};
            this.u = a
        }
        function Ef(a, b, c, d, e) {
            var f = a.g,
                g = e;
            C(d > f.m, "Stacking an older write on top of newer ones");
            m(g) || (g = !0);
            f.g.push({
                path: b,
                Ba: c,
                uc: d,
                visible: g
            });
            g && (f.f = Be(f.f, b, c));
            f.m = d;
            return e ? Ff(a, new sa(pa, b, c)) : []
        }
        function Gf(a, b, c, d) {
            var e = a.g;
            C(d > e.m, "Stacking an older merge on top of newer ones");
            e.g.push({
                path: b,
                children: c,
                uc: d,
                visible: !0
            });
            e.f = Ce(e.f, b, c);
            e.m = d;
            c = le(c);
            return Ff(a, new wd(pa, b, c))
        }

        function Hf(a, b, c) {
            c = c || !1;
            b = a.g.lc(b);
            return null == b ? [] : Ff(a, new na(b, c))
        }
        function If(a, b, c) {
            c = le(c);
            return Ff(a, new wd(Bd, b, c))
        }
        function Jf(a, b, c, d) {
            d = Kf(a, d);
            if (null != d) {
                var e = Lf(d);
                d = e.path;
                e = e.$a;
                b = A(d, b);
                c = new sa(new Ad(!1, !0, e, !0), b, c);
                return Mf(a, d, c)
            }
            return []
        }
        function Nf(a, b, c, d) {
            if (d = Kf(a, d)) {
                var e = Lf(d);
                d = e.path;
                e = e.$a;
                b = A(d, b);
                c = le(c);
                c = new wd(new Ad(!1, !0, e, !0), b, c);
                return Mf(a, d, c)
            }
            return []
        }
        Df.prototype.hb = function (a, b) {
            var c = a.path,
                d = null,
                e = !1;
            ue(this.f, c, function (a, b) {
                var f = A(a, c);
                d = b.Oa(f);
                e = e || null != Af(b);
                return !d
            });
            var f = this.f.get(c);
            f ? (e = e || null != Af(f), d = d || f.Oa(t)) : (f = new zf, this.f = this.f.set(c, f));
            var g;
            null != d ? g = !0 : (g = !1, d = O, ye(this.f.subtree(c), function (a, b) {
                var c = b.Oa(t);
                c && (d = d.T(a, c))
            }));
            var k = null != Cf(f, a);
            if (!k && !tf(a.F)) {
                var l = Of(a);
                C(!kc(this.m, l), "View does not exist, but we have a tag");
                var n = Pf++;
                this.m[l] = n;
                this.B["_" + n] = l
            }
            g = f.hb(a, b, new Le(c, this.g), d, g);
            k || e ||
                (f = Cf(f, a), g = g.concat(Qf(this, a, f)));
            return g
        };
        Df.prototype.Ra = function (a, b, c) {
            var d = a.path,
                e = this.f.get(d),
                f = [];
            if (e && ("default" === a.ra() || null != Cf(e, a))) {
                f = e.Ra(a, b, c);
                e.j() && (this.f = this.f.remove(d));
                e = f.de;
                f = f.Pd;
                b = -1 !== uc(e, function (a) {
                    return tf(a.F)
                });
                var g = se(this.f, d, function (a, b) {
                    return null != Af(b)
                });
                if (b && !g && (d = this.f.subtree(d), !d.j())) for (var d = Rf(d), k = 0; k < d.length; ++k) {
                        var l = d[k],
                            n = l.ya,
                            l = Sf(this, l);
                        this.u.Zc(n, Tf(this, n), l.ec, l.S)
                }
                if (!g && 0 < e.length && !c) if (b) this.u.pc(a, null);
                    else {
                        var u = this;
                        Kb(e, function (a) {
                            a.ra();
                            var b = u.m[Of(a)];
                            u.u.pc(a, b)
                        })
                    }
                Uf(this, e)
            }
            return f
        };
        Df.prototype.qa = function (a, b) {
            var c = this.g,
                d = se(this.f, a, function (b, c) {
                    var d = A(b, a);
                    if (d = c.Oa(d)) return d
                });
            return c.qa(a, d, b, !0)
        };

        function Rf(a) {
            return qe(a, function (a, c, d) {
                if (c && null != Af(c)) return [Af(c)];
                var e = [];
                c && (e = Bf(c));
                P(d, function (a) {
                    e = e.concat(a)
                });
                return e
            })
        }
        function Uf(a, b) {
            for (var c = 0; c < b.length; ++c) {
                var d = b[c];
                if (!tf(d.F)) {
                    var d = Of(d),
                        e = a.m[d];
                    delete a.m[d];
                    delete a.B["_" + e]
                }
            }
        }

        function Qf(a, b, c) {
            var d = b.path,
                e = Tf(a, b);
            c = Sf(a, c);
            b = a.u.Zc(b, e, c.ec, c.S);
            d = a.f.subtree(d);
            if (e) C(null == Af(d.value), "If we're adding a query, it shouldn't be shadowed");
            else for (e = qe(d, function (a, b, c) {
                    if (!a.j() && b && null != Af(b)) return [wf(Af(b))];
                    var d = [];
                    b && (d = d.concat(qc(Bf(b), function (a) {
                        return a.ya
                    })));
                    P(c, function (a) {
                        d = d.concat(a)
                    });
                    return d
                }), d = 0; d < e.length; ++d) c = e[d], a.u.pc(c, Tf(a, c));
            return b
        }

        function Sf(a, b) {
            var c = b.ya,
                d = Tf(a, c);
            return {
                ec: function () {
                    return (b.H() || O).hash()
                },
                S: function (b) {
                    if ("ok" === b) {
                        if (d) {
                            var f = c.path;
                            if (b = Kf(a, d)) {
                                var g = Lf(b);
                                b = g.path;
                                g = g.$a;
                                f = A(b, f);
                                f = new qa(new Ad(!1, !0, g, !0), f);
                                b = Mf(a, b, f)
                            } else b = []
                        } else b = Ff(a, new qa(Bd, c.path));
                        return b
                    }
                    f = "Unknown Error";
                    "too_big" === b ? f =
                        "The data requested exceeds the maximum size that can be accessed with a single request." :
                        "permission_denied" == b ? f = "Client doesn't have permission to access the desired data." :
                        "unavailable" == b &&
                        (f = "The service is unavailable");
                    f = Error(b + ": " + f);
                    f.code = b.toUpperCase();
                    return a.Ra(c, null, f)
                }
            }
        }
        function Of(a) {
            return a.path.toString() + "$" + a.ra()
        }
        function Lf(a) {
            var b = a.indexOf("$");
            C(-1 !== b && b < a.length - 1, "Bad queryKey.");
            return {
                $a: a.substr(b + 1),
                path: new z(a.substr(0, b))
            }
        }
        function Kf(a, b) {
            var c = a.B,
                d = "_" + b;
            return null !== c && d in c ? c[d] : void 0
        }
        function Tf(a, b) {
            var c = Of(b);
            return J(a.m, c)
        }
        var Pf = 1;

        function Mf(a, b, c) {
            var d = a.f.get(b);
            C(d, "Missing sync point for query tag that we're tracking");
            return d.Ma(c, new Le(b, a.g), null)
        }
        function Ff(a, b) {
            return Vf(a, b, a.f, null, new Le(t, a.g))
        }
        function Vf(a, b, c, d, e) {
            if (b.path.j()) return Wf(a, b, c, d, e);
            var f = c.get(t);
            null == d && null != f && (d = f.Oa(t));
            var g = [],
                k = B(b.path),
                l = b.Pb(k);
            if ((c = c.children.get(k)) && l) var n = d ? d.P(k) : null,
            k = e.G(k), g = g.concat(Vf(a, l, c, n, k));
            f && (g = g.concat(f.Ma(b, e, d)));
            return g
        }

        function Wf(a, b, c, d, e) {
            var f = c.get(t);
            null == d && null != f && (d = f.Oa(t));
            var g = [];
            c.children.ja(function (c, f) {
                var n = d ? d.P(c) : null,
                    u = e.G(c),
                    y = b.Pb(c);
                y && (g = g.concat(Wf(a, y, f, n, u)))
            });
            f && (g = g.concat(f.Ma(b, e, d)));
            return g
        };

        function sf(a) {
            this.w = a
        }
        h = sf.prototype;
        h.M = function (a, b, c, d, e) {
            C(a.ub(this.w), "A node must be indexed if only a child is updated");
            d = a.P(b);
            if (d.$(c)) return a;
            null != e && (c.j() ? a.wa(b) ? Xe(e, new F("child_removed", d, b)) : C(a.R(),
                "A child remove without an old child only makes sense on a leaf node") : d.j() ? Xe(e, new F(
                "child_added", c, b)) : Xe(e, new F("child_changed", c, b, d)));
            return a.R() && c.j() ? a : a.T(b, c).La(this.w)
        };
        h.pa = function (a, b, c) {
            null != c && (a.R() || a.X(E, function (a, e) {
                b.wa(a) || Xe(c, new F("child_removed", e, a))
            }), b.R() || b.X(E, function (b, e) {
                if (a.wa(b)) {
                    var f = a.P(b);
                    f.$(e) || Xe(c, new F("child_changed", e, b, f))
                } else Xe(c, new F("child_added", e, b))
            }));
            return b.La(this.w)
        };
        h.ba = function (a, b) {
            return a.j() ? O : a.ba(b)
        };
        h.za = function () {
            return !1
        };
        h.nb = function () {
            return this
        };
        h.V = function () {
            return this.w
        };

        function vf(a) {
            this.m = new sf(a.V());
            this.w = a.V();
            var b;
            a.ma ? (b = Xf(a), b = a.V().Lb(Yf(a), b)) : b = a.V().Ob();
            this.g = b;
            a.na ? (b = Zf(a), a = a.V().Lb($f(a), b)) : a = a.V().Mb();
            this.f = a
        }
        h = vf.prototype;
        h.matches = function (a) {
            return 0 >= this.w.compare(this.g, a) && 0 >= this.w.compare(a, this.f)
        };
        h.M = function (a, b, c, d, e) {
            this.matches(new w(b, c)) || (c = O);
            return this.m.M(a, b, c, d, e)
        };
        h.pa = function (a, b, c) {
            b.R() && (b = O);
            var d = b.La(this.w),
                d = d.ba(O),
                e = this;
            b.X(E, function (a, b) {
                e.matches(new w(a, b)) || (d = d.T(a, O))
            });
            return this.m.pa(a, d, c)
        };
        h.ba = function (a) {
            return a
        };
        h.za = function () {
            return !0
        };
        h.nb = function () {
            return this.m
        };
        h.V = function () {
            return this.w
        };

        function uf(a) {
            this.f = new vf(a);
            this.w = a.V();
            C(a.ka, "Only valid if limit has been set");
            this.la = a.la;
            this.g = !ag(a)
        }
        h = uf.prototype;
        h.M = function (a, b, c, d, e) {
            this.f.matches(new w(b, c)) || (c = O);
            return a.P(b).$(c) ? a : a.Qa() < this.la ? this.f.nb().M(a, b, c, d, e) : bg(this, a, b, c, d, e)
        };
        h.pa = function (a, b, c) {
            var d;
            if (b.R() || b.j()) d = O.La(this.w);
            else if (2 * this.la < b.Qa() && b.ub(this.w)) {
                d = O.La(this.w);
                b = this.g ? b.qb(this.f.f, this.w) : b.pb(this.f.g, this.w);
                for (var e = 0; 0 < b.Fa.length && e < this.la;) {
                    var f = Q(b),
                        g;
                    if (g = this.g ? 0 >= this.w.compare(this.f.g, f) : 0 >= this.w.compare(f, this.f.f)) d = d.T(f.name,
                            f.node), e++;
                    else break
                }
            } else {
                d = b.La(this.w);
                d = d.ba(O);
                var k, l, n;
                if (this.g) {
                    b = d.ld(this.w);
                    k = this.f.f;
                    l = this.f.g;
                    var u = Ed(this.w);
                    n = function (a, b) {
                        return u(b, a)
                    }
                } else b = d.ob(this.w), k = this.f.g, l = this.f.f,
                n = Ed(this.w);
                for (var e = 0, y = !1; 0 < b.Fa.length;) f = Q(b), !y && 0 >= n(k, f) && (y = !0), (g = y && e < this.la &&
                        0 >= n(f, l)) ? e++ : d = d.T(f.name, O)
            }
            return this.f.nb().pa(a, d, c)
        };
        h.ba = function (a) {
            return a
        };
        h.za = function () {
            return !0
        };
        h.nb = function () {
            return this.f.nb()
        };
        h.V = function () {
            return this.w
        };

        function bg(a, b, c, d, e, f) {
            var g;
            if (a.g) {
                var k = Ed(a.w);
                g = function (a, b) {
                    return k(b, a)
                }
            } else g = Ed(a.w);
            C(b.Qa() == a.la, "");
            var l = new w(c, d),
                n = a.g ? Zd(b, a.w) : $d(b, a.w),
                u = a.f.matches(l);
            if (b.wa(c)) {
                var y = b.P(c),
                    n = e.Jc(a.w, n, a.g);
                null != n && n.name == c && (n = e.Jc(a.w, n, a.g));
                e = null == n ? 1 : g(n, l);
                if (u && !d.j() && 0 <= e) return null != f && Xe(f, new F("child_changed", d, c, y)), b.T(c, d);
                null != f && Xe(f, new F("child_removed", y, c));
                b = b.T(c, O);
                return null != n && a.f.matches(n) ? (null != f && Xe(f, new F("child_added", n.node, n.name)), b.T(n.name,
                    n.node)) : b
            }
            return d.j() ? b : u && 0 <= g(n, l) ? (null != f && (Xe(f, new F("child_removed", n.node, n.name)), Xe(f,
                new F("child_added", d, c))), b.T(c, d).T(n.name, O)) : b
        };

        function cg() {
            this.lb = this.na = this.cb = this.ma = this.ka = !1;
            this.la = 0;
            this.fb = "";
            this.tb = null;
            this.Xa = "";
            this.rb = null;
            this.Wa = "";
            this.w = E
        }
        var dg = new cg;

        function ag(a) {
            return "" === a.fb ? a.ma : "l" === a.fb
        }
        function Yf(a) {
            C(a.ma, "Only valid if start has been set");
            return a.tb
        }
        function Xf(a) {
            C(a.ma, "Only valid if start has been set");
            return a.cb ? a.Xa : "[MIN_NAME]"
        }
        function $f(a) {
            C(a.na, "Only valid if end has been set");
            return a.rb
        }

        function Zf(a) {
            C(a.na, "Only valid if end has been set");
            return a.lb ? a.Wa : "[MAX_NAME]"
        }
        h = cg.prototype;
        h.V = function () {
            return this.w
        };

        function eg(a) {
            var b = new cg;
            b.ka = a.ka;
            b.la = a.la;
            b.ma = a.ma;
            b.tb = a.tb;
            b.cb = a.cb;
            b.Xa = a.Xa;
            b.na = a.na;
            b.rb = a.rb;
            b.lb = a.lb;
            b.Wa = a.Wa;
            b.w = a.w;
            return b
        }
        h.Oc = function (a) {
            var b = eg(this);
            b.ka = !0;
            b.la = a;
            b.fb = "";
            return b
        };
        h.Pc = function (a) {
            var b = eg(this);
            b.ka = !0;
            b.la = a;
            b.fb = "l";
            return b
        };
        h.Qc = function (a) {
            var b = eg(this);
            b.ka = !0;
            b.la = a;
            b.fb = "r";
            return b
        };
        h.oc = function (a, b) {
            var c = eg(this);
            c.ma = !0;
            m(a) || (a = null);
            c.tb = a;
            null != b ? (c.cb = !0, c.Xa = b) : (c.cb = !1, c.Xa = "");
            return c
        };
        h.$b = function (a, b) {
            var c = eg(this);
            c.na = !0;
            m(a) || (a = null);
            c.rb = a;
            m(b) ? (c.lb = !0, c.Wa = b) : (c.ve = !1, c.Wa = "");
            return c
        };

        function fg(a, b) {
            var c = eg(a);
            c.w = b;
            return c
        }
        function gg(a) {
            var b = {};
            a.ma && (b.sp = a.tb, a.cb && (b.sn = a.Xa));
            a.na && (b.ep = a.rb, a.lb && (b.en = a.Wa));
            if (a.ka) {
                b.l = a.la;
                var c = a.fb;
                "" === c && (c = ag(a) ? "l" : "r");
                b.vf = c
            }
            a.w !== E && (b.i = a.w.toString());
            return b
        }

        function tf(a) {
            return !(a.ma || a.na || a.ka)
        }
        function hg(a) {
            var b = {};
            if (tf(a) && a.w == E) return b;
            var c;
            a.w === E ? c = "$priority" : a.w === Nd ? c = "$value" : a.w === Kd ? c = "$key" : (C(a.w instanceof Gd,
                "Unrecognized index type!"), c = a.w.toString());
            b.orderBy = G(c);
            a.ma && (b.startAt = G(a.tb), a.cb && (b.startAt += "," + G(a.Xa)));
            a.na && (b.endAt = G(a.rb), a.lb && (b.endAt += "," + G(a.Wa)));
            a.ka && (ag(a) ? b.limitToFirst = a.la : b.limitToLast = a.la);
            return b
        }
        h.toString = function () {
            return G(gg(this))
        };

        function ig(a) {
            this.f = cc() + cc() + cc();
            this.g = a
        }
        ig.prototype.open = function (a, b, c) {
            function d() {
                c && (c(I("USER_CANCELLED")), c = null)
            }
            var e = this,
                f = Tb(ub),
                g;
            b.requestId = this.f;
            b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
            a += /\?/.test(a) ? "" : "?";
            a += Jb(b);
            (g = window.open(a, "_blank", "location=no")) && ga(g.addEventListener) ? (g.addEventListener("loadstart", function (
                a) {
                var b;
                if (b = a && a.url) a: {
                        try {
                            var n = document.createElement("a");
                            n.href = a.url;
                            b = n.host === f.host && "/blank/page.html" === n.pathname;
                            break a
                        } catch (u) {}
                        b = !1
                }
                b && (a = Rb(a.url), g.removeEventListener("exit",
                    d), g.close(), a = new vb(null, null, {
                    requestId: e.f,
                    requestKey: a
                }), e.g.requestWithCredential("/auth/session", a, c), c = null)
            }), g.addEventListener("exit", d)) : c(I("TRANSPORT_UNAVAILABLE"))
        };
        ig.isAvailable = function () {
            return !NODE_CLIENT && ib()
        };
        ig.prototype.jb = function () {
            return "redirect"
        };

        function jg(a) {
            if (!a.window_features || "undefined" !== typeof navigator && (-1 !== navigator.userAgent.indexOf("Fennec/") || -
                1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android"))) a.window_features =
                    void 0;
            a.window_name || (a.window_name = "_blank");
            this.f = a
        }
        jg.prototype.open = function (a, b, c) {
            function d(a) {
                g && (document.body.removeChild(g), g = void 0);
                u && (u = clearInterval(u));
                Pb(window, "message", e);
                Pb(window, "unload", d);
                if (n && !a) try {
                        n.close()
                } catch (b) {
                    k.postMessage("die", l)
                }
                n = k = void 0
            }
            function e(a) {
                if (a.origin === l) try {
                        var b = ob(a.data);
                        "ready" === b.a ? k.postMessage(y, l) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) :
                            "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null))
                } catch (e) {}
            }
            var f = kb(),
                g, k;
            if (!this.f.relay_url) return c(Error("invalid arguments: origin of url and relay_url must match"));
            var l = Qb(a);
            if (l !== Qb(this.f.relay_url)) c && setTimeout(function () {
                    c(Error("invalid arguments: origin of url and relay_url must match"))
                }, 0);
            else {
                f && (g = document.createElement("iframe"), g.setAttribute("src", this.f.relay_url), g.style.display =
                    "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
                a += (/\?/.test(a) ? "" : "?") + Jb(b);
                var n = window.open(a, this.f.window_name, this.f.window_features);
                k || (k = n);
                var u = setInterval(function () {
                    n && n.closed && (d(!1), c && (c(I("USER_CANCELLED")),
                        c = null))
                }, 500),
                    y = G({
                        a: "request",
                        d: b
                    });
                Ob(window, "unload", d);
                Ob(window, "message", e)
            }
        };
        jg.isAvailable = function () {
            return !NODE_CLIENT && "postMessage" in window && !jb() && !(ib() || "undefined" !== typeof navigator && (
                navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href)) ||
                "undefined" !== typeof navigator && "undefined" !== typeof window && (navigator.userAgent.match(
                /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent
                .match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone)) && !
                ("undefined" !== typeof navigator && navigator.userAgent.match(/PhantomJS/))
        };
        jg.prototype.jb = function () {
            return "popup"
        };

        function kg(a) {
            var b = {}, c = {}, d = {}, e = "";
            try {
                var f = a.split("."),
                    b = ob(id(f[0]) || ""),
                    c = ob(id(f[1]) || ""),
                    e = f[2],
                    d = c.d || {};
                delete c.d
            } catch (g) {}
            return {
                se: b,
                Ub: c,
                data: d,
                ue: e
            }
        }
        function lg(a) {
            a = kg(a).Ub;
            return "object" === typeof a && a.hasOwnProperty("iat") ? J(a, "iat") : null
        };

        function mg(a, b) {
            this.f = nd("p:rest:");
            this.g = a;
            this.m = b;
            this.u = null;
            this.ea = {}
        }
        function ng(a, b) {
            if (m(b)) return "tag$" + b;
            var c = a.F;
            C(tf(c) && c.w == E, "should have a tag if it's not a default query.");
            return a.path.toString()
        }
        h = mg.prototype;
        h.nd = function (a, b, c, d) {
            var e = a.path.toString();
            this.f("Listen called for " + e + " " + a.ra());
            var f = ng(a, c),
                g = {};
            this.ea[f] = g;
            a = hg(a.F);
            var k = this;
            og(this, e + ".json", a, function (a, b) {
                var u = b;
                404 === a && (a = u = null);
                null === a && k.m(e, u, !1, c);
                J(k.ea, f) === g && d(a ? 401 == a ? "permission_denied" : "rest_error:" + a : "ok", null)
            })
        };
        h.ud = function (a, b) {
            var c = ng(a, b);
            delete this.ea[c]
        };
        h.U = function (a, b) {
            this.u = a;
            var c = kg(a),
                d = c.data,
                c = c.Ub && c.Ub.exp;
            b && b("ok", {
                auth: d,
                expires: c
            })
        };
        h.rc = function (a) {
            this.u = null;
            a("ok", null)
        };
        h.Sc = function () {};
        h.pd = function () {};
        h.gc = function () {};
        h.Eb = function () {};
        h.od = function () {};
        h.Uc = function () {};

        function og(a, b, c, d) {
            c = c || {};
            c.format = "export";
            a.u && (c.auth = a.u);
            var e = (a.g.ab ? "https://" : "http://") + a.g.host + b + "?" + Jb(c);
            a.f("Sending REST request for " + e);
            var f = new XMLHttpRequest;
            f.onreadystatechange = function () {
                if (d && 4 === f.readyState) {
                    a.f("REST Response for " + e + " received. status:", f.status, "response:", f.responseText);
                    var b = null;
                    if (200 <= f.status && 300 > f.status) {
                        try {
                            b = ob(f.responseText)
                        } catch (c) {
                            S("Failed to parse JSON response for " + e + ": " + f.responseText)
                        }
                        d(null, b)
                    } else 401 !== f.status && 404 !== f.status &&
                            S("Got unsuccessful REST response for " + e + " Status: " + f.status), d(f.status);
                    d = null
                }
            };
            f.open("GET", e, !0);
            f.send()
        };

        function pg(a, b) {
            this.g = ["session", a.ic, a.wb].join(":");
            this.f = b
        }
        pg.prototype.set = function (a, b) {
            if (!b) if (this.f.length) b = this.f[0];
                else throw Error("wd.login.SessionManager : No storage options available!");
            b.set(this.g, a)
        };
        pg.prototype.get = function () {
            var a = qc(this.f, q(this.m, this)),
                a = pc(a, function (a) {
                    return null !== a
                });
            wc(a, function (a, c) {
                return lg(c.token) - lg(a.token)
            });
            return 0 < a.length ? a.shift() : null
        };
        pg.prototype.m = function (a) {
            try {
                var b = a.get(this.g);
                if (b && b.token) return b
            } catch (c) {}
            return null
        };

        function qg(a) {
            Kb(a.f, function (b) {
                b.remove(a.g)
            })
        };

        function rg(a, b, c, d) {
            he.call(this, ["auth_status"]);
            this.u = a;
            this.W = b;
            this.ca = c;
            this.ta = d;
            this.g = new pg(a, [rb, K]);
            this.f = null;
            this.I = !1;
            sg(this)
        }
        la(rg, he);
        h = rg.prototype;
        h.Ic = function () {
            return this.f || null
        };

        function sg(a) {
            K.get("redirect_request_id") && tg(a);
            var b = a.g.get();
            b && b.token ? (ug(a, b), a.W(b.token, function (c, d) {
                vg(a, c, d, !1, b.token, b)
            }, function (b, d) {
                wg(a, "resumeSession()", b, d)
            })) : ug(a, null)
        }

        function xg(a, b, c, d, e, f) {
            "wilddogio-demo.com" === a.u.domain && S(
                "Wilddog authentication is not supported on demo Wilddogs (*.wilddogio-demo.com). To secure your Wilddog, create a production Wilddog at https://www.wilddog.com.");
            a.W(b, function (f, k) {
                vg(a, f, k, !0, b, c, d || {}, e)
            }, function (b, c) {
                wg(a, "auth()", b, c, f)
            })
        }
        function yg(a, b) {
            qg(a.g);
            ug(a, null);
            a.ca(function (a, d) {
                if ("ok" === a) T(b, null);
                else {
                    var e = (a || "error").toUpperCase(),
                        f = e;
                    d && (f += ": " + d);
                    f = Error(f);
                    f.code = e;
                    T(b, f)
                }
            })
        }

        function vg(a, b, c, d, e, f, g, k) {
            "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = e, c = null, b && x(b, "uid") ?
                c = J(b, "uid") : x(f, "uid") && (c = J(f, "uid")), f.uid = c, c = "custom", b && x(b, "provider") ? c =
                J(b, "provider") : x(f, "provider") && (c = J(f, "provider")), f.provider = c, qg(a.g), g = g || {}, c =
                rb, "sessionOnly" === g.remember && (c = K), "none" !== g.remember && a.g.set(f, c), ug(a, f)), T(k,
                null, f)) : (qg(a.g), ug(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f =
                Error(f), f.code = a, T(k, f))
        }

        function wg(a, b, c, d, e) {
            S(b + " was canceled: " + d);
            qg(a.g);
            ug(a, null);
            a = Error(d);
            a.code = c.toUpperCase();
            T(e, a)
        }
        function zg(a, b, c, d, e) {
            Ag(a);
            c = new vb(d || {}, {}, c || {});
            Bg(a, NODE_CLIENT ? [Yb] : [dc, Vb], "/auth/" + b, c, e)
        }

        function Cg(a, b, c, d) {
            Ag(a);
            var e = [jg, ig];
            c = xb(c);
            "anonymous" === b || "password" === b ? setTimeout(function () {
                T(d, I("TRANSPORT_UNAVAILABLE"))
            }, 0) : (c.qc.window_features =
                "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" +
                ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ?
                .5 * (screen.width - 625) : 0), c.qc.relay_url = Ub(a.u.wb), c.qc.requestWithCredential = q(a.Bb, a),
                Bg(a, e, "/auth/" + b, c, d))
        }

        function tg(a) {
            var b = K.get("redirect_request_id");
            if (b) {
                var c = K.get("redirect_client_options");
                K.remove("redirect_request_id");
                K.remove("redirect_client_options");
                var d = [dc, Vb],
                    b = {
                        requestId: b,
                        requestKey: Rb(document.location.hash)
                    }, c = new vb(c, {}, b);
                a.I = !0;
                try {
                    document.location.hash = document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/, "")
                } catch (e) {}
                Bg(a, d, "/auth/session", c, function () {
                    this.I = !1
                }.bind(a))
            }
        }
        h.Ec = function (a, b) {
            Ag(this);
            var c = xb(a);
            c.Ka._method = "POST";
            this.Bb("/users", c, function (a, c) {
                a ? T(b, a) : T(b, a, c)
            })
        };
        h.Tc = function (a, b) {
            var c = this;
            Ag(this);
            var d = "/users/" + encodeURIComponent(a.email),
                e = xb(a);
            e.Ka._method = "DELETE";
            this.Bb(d, e, function (a, d) {
                !a && d && d.uid && c.f && c.f.uid && c.f.uid === d.uid && yg(c);
                T(b, a)
            })
        };
        h.Bc = function (a, b) {
            Ag(this);
            var c = "/users/" + encodeURIComponent(a.email) + "/password",
                d = xb(a);
            d.Ka._method = "PUT";
            d.Ka.password = a.newPassword;
            this.Bb(c, d, function (a) {
                T(b, a)
            })
        };
        h.Ac = function (a, b) {
            Ag(this);
            var c = "/users/" + encodeURIComponent(a.oldEmail) + "/email",
                d = xb(a);
            d.Ka._method = "PUT";
            d.Ka.email = a.newEmail;
            d.Ka.password = a.password;
            this.Bb(c, d, function (a) {
                T(b, a)
            })
        };
        h.Vc = function (a, b) {
            Ag(this);
            var c = "/users/" + encodeURIComponent(a.email) + "/password",
                d = xb(a);
            d.Ka._method = "POST";
            this.Bb(c, d, function (a) {
                T(b, a)
            })
        };
        h.Bb = function (a, b, c) {
            Dg(this, NODE_CLIENT ? [Yb] : [dc, Vb], a, b, c)
        };

        function Bg(a, b, c, d, e) {
            Dg(a, b, c, d, function (b, c) {
                !b && c && c.token && c.uid ? xg(a, c.token, c, d.Vb, function (a, b) {
                    a ? T(e, a) : T(e, null, b)
                }) : T(e, b || I("UNKNOWN_ERROR"))
            })
        }

        function Dg(a, b, c, d, e) {
            b = pc(b, function (a) {
                return "function" === typeof a.isAvailable && a.isAvailable()
            });
            0 === b.length ? setTimeout(function () {
                T(e, I("TRANSPORT_UNAVAILABLE"))
            }, 0) : (b = new(b.shift())(d.qc), d = mb(d.Ka), d.v = (NODE_CLIENT ? "node-" : "js-") + CLIENT_VERSION, d.transport =
                b.jb(), d.suppress_status_codes = !0, a = Sb() + "/" + a.u.wb + c, b.open(a, d, function (a, b) {
                if (a) T(e, a);
                else if (b && b.error) {
                    var c = Error(b.error.message);
                    c.code = b.error.code;
                    c.details = b.error.details;
                    T(e, c)
                } else T(e, null, b)
            }))
        }

        function ug(a, b) {
            var c = null !== a.f || null !== b;
            a.f = b;
            c && a.B("auth_status", b);
            a.ta(null !== b)
        }
        h.Kc = function (a) {
            C("auth_status" === a, 'initial event must be of type "auth_status"');
            return this.I ? null : [this.f]
        };

        function Ag(a) {
            var b = a.u;
            if ("wilddogio.com" !== b.domain && "wilddogio-demo.com" !== b.domain && "auth.wilddog.com" === ub) throw Error(
                    "This custom Wilddog server ('" + a.u.domain + "') does not support delegated login.");
        };

        function Ea(a) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b++ : 2048 > d ? b += 2 : 55296 <= d && 56319 >= d ? (b += 4, c++) : b += 3
            }
            return b
        };
        var Eg = /[\[\].#$\/\u0000-\u001F\u007F]/,
            Fg = /[\[\].#$\u0000-\u001F\u007F]/;

        function Gg(a) {
            return p(a) && 0 !== a.length && !Eg.test(a)
        }
        function Hg(a) {
            return null === a || p(a) || fa(a) && !qd(a) || ha(a) && x(a, ".sv")
        }
        function Ig(a, b, c, d) {
            d && !m(b) || Jg(M(a, 1, d), b, c)
        }

        function Jg(a, b, c) {
            c instanceof z && (c = new Da(c, a));
            if (!m(b)) throw Error(a + "contains undefined " + Ga(c));
            if (ga(b)) throw Error(a + "contains a function " + Ga(c) + " with contents: " + b.toString());
            if (qd(b)) throw Error(a + "contains " + b.toString() + " " + Ga(c));
            if (p(b) && b.length > 10485760 / 3 && 10485760 < Ea(b)) throw Error(a +
                    "contains a string greater than 10485760 utf8 bytes " + Ga(c) + " ('" + b.substring(0, 50) +
                    "...')");
            if (ha(b)) {
                var d = !1,
                    e = !1;
                lb(b, function (b, g) {
                    if (".value" === b) d = !0;
                    else if (".priority" !== b && ".sv" !== b && (e = !0, !Gg(b))) throw Error(a +
                            " contains an invalid key (" + b + ") " + Ga(c) +
                            '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                    c.push(b);
                    Jg(a, g, c);
                    c.pop()
                });
                if (d && e) throw Error(a + ' contains ".value" child ' + Ga(c) + " in addition to actual children.");
            }
        }

        function Kg(a, b) {
            var c, d;
            for (c = 0; c < b.length; c++) {
                d = b[c];
                for (var e = d.slice(), f = 0; f < e.length; f++) if ((".priority" !== e[f] || f !== e.length - 1) && !
                        Gg(e[f])) throw Error(a + "contains an invalid key (" + e[f] + ") in path " + d.toString() +
                            '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
            }
            b.sort(z.f);
            e = null;
            for (c = 0; c < b.length; c++) {
                d = b[c];
                if (null !== e && e.contains(d)) throw Error(a + "contains a path " + e.toString() +
                        " that is ancestor of another path " + d.toString());
                e = d
            }
        }

        function Lg(a, b, c) {
            var d = M(a, 1, !1);
            if (!ha(b) || ea(b)) throw Error(d + " must be an Object containing the children to replace.");
            if (x(b, ".value")) throw Error(d +
                    ' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');
            var e = [];
            lb(b, function (a, b) {
                var k = new z(a);
                Jg(d, b, c.G(k));
                if (".priority" === Ca(k) && !Hg(b)) throw Error(d + "contains an invalid value for '" + k.toString() +
                        "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
                e.push(k)
            });
            Kg(d, e)
        }
        function Mg(a, b, c) {
            if (qd(c)) throw Error(M(a, b, !1) + "is " + c.toString() +
                    ", but must be a valid Wilddog priority (a string, finite number, server value, or null).");
            if (!Hg(c)) throw Error(M(a, b, !1) +
                    "must be a valid Wilddog priority (a string, finite number, server value, or null).");
        }

        function Ng(a, b, c) {
            if (!c || m(b)) switch (b) {
                case "value":
                case "child_added":
                case "child_removed":
                case "child_changed":
                case "child_moved":
                    break;
                default:
                    throw Error(M(a, 1, c) +
                        'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
            }
        }
        function Og(a, b, c, d) {
            if ((!d || m(c)) && !Gg(c)) throw Error(M(a, b, d) + 'was an invalid key: "' + c +
                    '".  Wilddog keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
        }

        function Pg(a, b) {
            if (!p(b) || 0 === b.length || Fg.test(b)) throw Error(M(a, 1, !1) + 'was an invalid path: "' + b +
                    '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
        }
        function Qg(a, b) {
            if (".info" === B(b)) throw Error(a + " failed: Can't modify data under /.info/");
        }
        function Rg(a, b) {
            if (!p(b)) throw Error(M(a, 1, !1) + "must be a valid credential (a string).");
        }
        function Sg(a, b, c) {
            if (!p(c)) throw Error(M(a, b, !1) + "must be a valid string.");
        }

        function Tg(a, b, c, d) {
            if (!d || m(c)) if (!ha(c) || null === c) throw Error(M(a, b, d) + "must be a valid object.");
        }
        function Ug(a, b, c) {
            if (!ha(b) || null === b || !x(b, c)) throw Error(M(a, 1, !1) + 'must contain the key "' + c + '"');
            if (!p(J(b, c))) throw Error(M(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
        };

        function U(a, b, c) {
            this.f = a;
            this.g = b;
            this.w = c
        }
        U.prototype.N = function () {
            L("Wilddog.DataSnapshot.val", 0, 0, arguments.length);
            return this.f.N()
        };
        U.prototype.val = U.prototype.N;
        U.prototype.gd = function () {
            L("Wilddog.DataSnapshot.exportVal", 0, 0, arguments.length);
            return this.f.N(!0)
        };
        U.prototype.exportVal = U.prototype.gd;
        U.prototype.m = function () {
            L("Wilddog.DataSnapshot.exists", 0, 0, arguments.length);
            return !this.f.j()
        };
        U.prototype.exists = U.prototype.m;
        U.prototype.G = function (a) {
            L("Wilddog.DataSnapshot.child", 0, 1, arguments.length);
            fa(a) && (a = String(a));
            Pg("Wilddog.DataSnapshot.child", a);
            var b = new z(a),
                c = this.g.G(b);
            return new U(this.f.ia(b), c, E)
        };
        U.prototype.child = U.prototype.G;
        U.prototype.wa = function (a) {
            L("Wilddog.DataSnapshot.hasChild", 1, 1, arguments.length);
            Pg("Wilddog.DataSnapshot.hasChild", a);
            var b = new z(a);
            return !this.f.ia(b).j()
        };
        U.prototype.hasChild = U.prototype.wa;
        U.prototype.J = function () {
            L("Wilddog.DataSnapshot.getPriority", 0, 0, arguments.length);
            return this.f.J().N()
        };
        U.prototype.getPriority = U.prototype.J;
        U.prototype.u = function (a) {
            L("Wilddog.DataSnapshot.forEach", 1, 1, arguments.length);
            N("Wilddog.DataSnapshot.forEach", 1, a, !1);
            if (this.f.R()) return !1;
            var b = this;
            return !!this.f.X(this.w, function (c, d) {
                return a(new U(d, b.g.G(c), E))
            })
        };
        U.prototype.forEach = U.prototype.u;
        U.prototype.dc = function () {
            L("Wilddog.DataSnapshot.hasChildren", 0, 0, arguments.length);
            return this.f.R() ? !1 : !this.f.j()
        };
        U.prototype.hasChildren = U.prototype.dc;
        U.prototype.name = function () {
            S("Wilddog.DataSnapshot.name() being deprecated. Please use Wilddog.DataSnapshot.key() instead.");
            L("Wilddog.DataSnapshot.name", 0, 0, arguments.length);
            return this.key()
        };
        U.prototype.name = U.prototype.name;
        U.prototype.key = function () {
            L("Wilddog.DataSnapshot.key", 0, 0, arguments.length);
            return this.g.key()
        };
        U.prototype.key = U.prototype.key;
        U.prototype.Qa = function () {
            L("Wilddog.DataSnapshot.numChildren", 0, 0, arguments.length);
            return this.f.Qa()
        };
        U.prototype.numChildren = U.prototype.Qa;
        U.prototype.zb = function () {
            L("Wilddog.DataSnapshot.ref", 0, 0, arguments.length);
            return this.g
        };
        U.prototype.ref = U.prototype.zb;

        function W(a, b, c, d) {
            this.A = a;
            this.path = b;
            this.F = c;
            this.f = d
        }

        function Vg(a) {
            var b = null,
                c = null;
            a.ma && (b = Yf(a));
            a.na && (c = $f(a));
            if (a.V() === Kd) {
                if (a.ma) {
                    if ("[MIN_NAME]" != Xf(a)) throw Error(
                            "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                    if ("string" !== typeof b) throw Error(
                            "Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
                }
                if (a.na) {
                    if ("[MAX_NAME]" != Zf(a)) throw Error(
                            "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                    if ("string" !==
                        typeof c) throw Error(
                            "Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
                }
            } else if (a.V() === E) {
                if (null != b && !Hg(b) || null != c && !Hg(c)) throw Error(
                        "Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
            } else if (C(a.V() instanceof Gd || a.V() === Nd, "unknown index type."), null != b && "object" === typeof b ||
                null != c && "object" === typeof c) throw Error(
                    "Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
        }
        function Wg(a) {
            if (a.ma && a.na && a.ka && (!a.ka || "" === a.fb)) throw Error(
                    "Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
        }
        function Xg(a, b) {
            if (!0 === a.f) throw Error(b + ": You can't combine multiple orderBy calls.");
        }
        W.prototype.zb = function () {
            L("Query.ref", 0, 0, arguments.length);
            return new V(this.A, this.path)
        };
        W.prototype.ref = W.prototype.zb;
        W.prototype.Za = function (a, b, c, d) {
            L("Query.on", 2, 4, arguments.length);
            Ng("Query.on", a, !1);
            N("Query.on", 2, b, !1);
            var e = Yg("Query.on", c, d);
            if ("value" === a) Zg(this.A, this, new cf(b, e.cancel || null, e.context || null));
            else {
                var f = {};
                f[a] = b;
                Zg(this.A, this, new df(f, e.cancel, e.context))
            }
            return b
        };
        W.prototype.on = W.prototype.Za;
        W.prototype.xb = function (a, b, c) {
            L("Query.off", 0, 3, arguments.length);
            Ng("Query.off", a, !0);
            N("Query.off", 2, b, !0);
            zb("Query.off", 3, c);
            var d = null,
                e = null;
            "value" === a ? d = new cf(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new df(e, null,
                c || null));
            e = this.A;
            d = ".info" === B(this.path) ? e.W.Ra(this, d) : e.f.Ra(this, d);
            bb(e.g, this.path, d)
        };
        W.prototype.off = W.prototype.xb;
        W.prototype.m = function (a, b) {
            function c(g) {
                f && (f = !1, e.xb(a, c), b.call(d.context, g))
            }
            L("Query.once", 2, 4, arguments.length);
            Ng("Query.once", a, !1);
            N("Query.once", 2, b, !1);
            var d = Yg("Query.once", arguments[2], arguments[3]),
                e = this,
                f = !0;
            this.Za(a, c, function (b) {
                e.xb(a, c);
                d.cancel && d.cancel.call(d.context, b)
            })
        };
        W.prototype.once = W.prototype.m;
        W.prototype.Oc = function (a) {
            S("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
            L("Query.limit", 1, 1, arguments.length);
            if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error(
                    "Query.limit: First argument must be a positive integer.");
            if (this.F.ka) throw Error(
                    "Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
            var b = this.F.Oc(a);
            Wg(b);
            return new W(this.A, this.path, b, this.f)
        };
        W.prototype.limit = W.prototype.Oc;
        W.prototype.Pc = function (a) {
            L("Query.limitToFirst", 1, 1, arguments.length);
            if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error(
                    "Query.limitToFirst: First argument must be a positive integer.");
            if (this.F.ka) throw Error(
                    "Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
            return new W(this.A, this.path, this.F.Pc(a), this.f)
        };
        W.prototype.limitToFirst = W.prototype.Pc;
        W.prototype.Qc = function (a) {
            L("Query.limitToLast", 1, 1, arguments.length);
            if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error(
                    "Query.limitToLast: First argument must be a positive integer.");
            if (this.F.ka) throw Error(
                    "Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
            return new W(this.A, this.path, this.F.Qc(a), this.f)
        };
        W.prototype.limitToLast = W.prototype.Qc;
        W.prototype.u = function (a) {
            L("Query.orderByChild", 1, 1, arguments.length);
            if ("$key" === a) throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
            if ("$priority" === a) throw Error(
                    'Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
            if ("$value" === a) throw Error(
                    'Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
            Og("Query.orderByChild", 1, a, !1);
            Xg(this, "Query.orderByChild");
            var b = fg(this.F, new Gd(a));
            Vg(b);
            return new W(this.A,
                this.path, b, !0)
        };
        W.prototype.orderByChild = W.prototype.u;
        W.prototype.B = function () {
            L("Query.orderByKey", 0, 0, arguments.length);
            Xg(this, "Query.orderByKey");
            var a = fg(this.F, Kd);
            Vg(a);
            return new W(this.A, this.path, a, !0)
        };
        W.prototype.orderByKey = W.prototype.B;
        W.prototype.I = function () {
            L("Query.orderByPriority", 0, 0, arguments.length);
            Xg(this, "Query.orderByPriority");
            var a = fg(this.F, E);
            Vg(a);
            return new W(this.A, this.path, a, !0)
        };
        W.prototype.orderByPriority = W.prototype.I;
        W.prototype.W = function () {
            L("Query.orderByValue", 0, 0, arguments.length);
            Xg(this, "Query.orderByValue");
            var a = fg(this.F, Nd);
            Vg(a);
            return new W(this.A, this.path, a, !0)
        };
        W.prototype.orderByValue = W.prototype.W;
        W.prototype.oc = function (a, b) {
            L("Query.startAt", 0, 2, arguments.length);
            Ig("Query.startAt", a, this.path, !0);
            Og("Query.startAt", 2, b, !0);
            var c = this.F.oc(a, b);
            Wg(c);
            Vg(c);
            if (this.F.ma) throw Error(
                    "Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
            m(a) || (b = a = null);
            return new W(this.A, this.path, c, this.f)
        };
        W.prototype.startAt = W.prototype.oc;
        W.prototype.$b = function (a, b) {
            L("Query.endAt", 0, 2, arguments.length);
            Ig("Query.endAt", a, this.path, !0);
            Og("Query.endAt", 2, b, !0);
            var c = this.F.$b(a, b);
            Wg(c);
            Vg(c);
            if (this.F.na) throw Error(
                    "Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
            return new W(this.A, this.path, c, this.f)
        };
        W.prototype.endAt = W.prototype.$b;
        W.prototype.g = function (a, b) {
            L("Query.equalTo", 1, 2, arguments.length);
            Ig("Query.equalTo", a, this.path, !1);
            Og("Query.equalTo", 2, b, !0);
            if (this.F.ma) throw Error(
                    "Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
            if (this.F.na) throw Error(
                    "Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
            return this.oc(a, b).$b(a, b)
        };
        W.prototype.equalTo = W.prototype.g;
        W.prototype.toString = function () {
            L("Query.toString", 0, 0, arguments.length);
            for (var a = this.path, b = "", c = a.aa; c < a.D.length; c++) "" !== a.D[c] && (b += "/" +
                    encodeURIComponent(String(a.D[c])));
            return this.A.toString() + (b || "/")
        };
        W.prototype.toString = W.prototype.toString;
        W.prototype.ra = function () {
            var a = sd(gg(this.F));
            return "{}" === a ? "default" : a
        };

        function Yg(a, b, c) {
            var d = {
                cancel: null,
                context: null
            };
            if (b && c) d.cancel = b, N(a, 3, d.cancel, !0), d.context = c, zb(a, 4, d.context);
            else if (b) if ("object" === typeof b && null !== b) d.context = b;
                else if ("function" === typeof b) d.cancel = b;
            else throw Error(M(a, 3, !0) + " must either be a cancel callback or a context object.");
            return d
        };
        var $g = {}, ah = null;
        "undefined" != typeof require && "undefined" !== typeof module && module.exports ? ah = require(
            "engine.io-client") : ah = eio;

        function bh(a, b, c, d, e) {
            this.W = a;
            this.m = nd("c:" + this.W + ":");
            this.ca = c;
            this.I = d;
            this.B = e;
            this.f = b;
            this.u = 0;
            this.m("Connection created");
            this.g = ch(this);
            this.g.on("open", dh(this));
            this.g.on("error", eh(this))
        }
        function dh(a) {
            return function () {
                a.g.on("message", fh(a));
                a.g.on("close", gh(a))
            }
        }

        function fh(a) {
            return function (b) {
                if (null == b) throw Error("data is null");
                if (0 != b.charAt(0)) if (2 == b.charAt(0)) {
                        var c = null;
                        try {
                            c = JSON.parse(b.substr(1))
                        } catch (f) {
                            throw f;
                        }
                        if ("object" != typeof c || 2 > c.length) throw Error("decodedData in wrong format");
                        b = c[1];
                        if ("wd" == c[0]) if ("c" == b.t) if (c = b.d, "h" == c.t) {
                                    b = c.d;
                                    var c = b.ts,
                                        d = b.v,
                                        e = b.h;
                                    a.sessionId = b.s;
                                    "1.0" != d && S("Protocol version mismatch detected");
                                    0 == a.u && (e != a.f.Aa ? (tb(a.f, e), a.m("updateHost ", e), a.g.close(), a.g =
                                        ch(a), a.g.on("open", dh(a)), a.g.on("error",
                                        eh(a))) : (a.u = 1, a.m("realtime state connected"), b = a.f, d = b.Na.indexOf(
                                        a.f.Aa), 0 <= d && (b.Na.splice(d, 1), K.set("failHosts", JSON.stringify(b.Na))),
                                        a.I && (a.I(c), null == a.I)))
                                } else "r" == c.t && (c = c.d, a.m("Reset packet received.  New host: " + c), tb(a.f, c),
                                        a.close());
                                else "d" == b.t && a.ca(b.d);
                                else a.m("eventType not known")
                    } else 1 != b.charAt(0) && a.m("data format error")
            }
        }
        function gh(a) {
            return function () {
                2 !== a.u && (a.m("Closing realtime connection."), a.u = 2, a.B && (a.B(), a.B = null))
            }
        }

        function eh(a) {
            return function (b) {
                if (0 == a.u) {
                    var c = a.f.Aa,
                        d = a.f;
                    null != c && 0 > d.Na.indexOf(c) && c != d.host && (d.Na.push(c), K.set("failHosts", JSON.stringify(
                        d.Na)));
                    a.m("error while connecting", b, c);
                    tb(a.f)
                }
                a.close()
            }
        }

        function ch(a) {
            var b = (a.f.ab ? "https://" : "http://") + a.f.Aa + "?v=1.0&cv=" + CLIENT_VERSION,
                c = a.f;
            c.host !== c.Aa && (b = b + "&ns=" + a.f.wb);
            a.sessionId && (b = b + "&s=" + a.sessionId);
            0 < a.f.Na.length && (b = b + "&fst=" + encodeURIComponent(a.f.Na.join(",")));
            a = {
                path: "/.ws",
                rememberUpgrade: !0
            };
            "undefined" == typeof document && (a.jsonp = !1);
            return ah(b, a)
        }
        bh.prototype.xa = function (a) {
            a = "2" + JSON.stringify(["wd", {
                    t: "d",
                    d: a
                }]);
            this.g.send(a)
        };
        bh.prototype.close = function () {
            2 !== this.u && (this.m("Closing realtime connection."), this.u = 2, this.g.close(), this.B && (this.B(),
                this.B = null))
        };

        function hh(a, b, c, d) {
            this.xc = ih++;
            this.f = nd("p:" + this.xc + ":");
            this.vc = !1;
            this.ea = {};
            this.m = [];
            this.Ha = 0;
            this.ta = [];
            this.g = !1;
            this.I = 1E3;
            this.gb = 3E5;
            this.dd = b;
            this.cd = c;
            this.Dd = d;
            this.Ed = a;
            this.Yc = null;
            this.Rb = {};
            this.Bd = 0;
            this.sa = this.wc = null;
            jh(this, 0);
            Ue.Ua().Za("visible", this.ae, this); - 1 === a.host.indexOf("wd.local") && Me.Ua().Za("online", this.$d,
                this)
        }
        var ih = 0,
            kh = 0;
        h = hh.prototype;
        h.xa = function (a, b, c) {
            var d = ++this.Bd;
            a = {
                r: d,
                a: a,
                b: b
            };
            this.f(G(a));
            C(this.g, "sendRequest call when we're not connected not allowed.");
            this.B.xa(a);
            c && (this.Rb[d] = c)
        };
        h.nd = function (a, b, c, d) {
            var e = a.ra(),
                f = a.path.toString();
            this.f("Listen called for " + f + " " + e);
            this.ea[f] = this.ea[f] || {};
            C(!this.ea[f][e], "listen() called twice for same path/queryId.");
            a = {
                S: d,
                ec: b,
                be: a,
                tag: c
            };
            this.ea[f][e] = a;
            this.g && lh(this, a)
        };

        function lh(a, b) {
            var c = b.be,
                d = c.path.toString(),
                e = c.ra();
            a.f("Listen on " + d + " for " + e);
            var f = {
                p: d
            };
            b.tag && (f.q = gg(c.F), f.t = b.tag);
            f.h = b.ec();
            a.xa("q", f, function (f) {
                var k = f.d,
                    l = f.s;
                if (k && "object" === typeof k && x(k, "w")) {
                    var n = J(k, "w");
                    ea(n) && 0 <= yb(n, "no_index") && S("Using an unspecified index. Consider adding " + (
                        '".indexOn": "' + c.F.V().toString() + '"') + " at " + c.path.toString() +
                        " to your security rules for better performance")
                }(a.ea[d] && a.ea[d][e]) === b && (a.f("listen response", f), "ok" !== l && mh(a, d, e), b.S &&
                    b.S(l, k))
            })
        }
        h.U = function (a, b, c) {
            this.u = {
                Od: a,
                hd: !1,
                Ib: b,
                Tb: c
            };
            this.f("Authenticating using credential: " + a);
            nh(this);
            (b = 40 == a.length) || (a = kg(a).Ub, b = "object" === typeof a && !0 === J(a, "admin"));
            b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.gb = 3E4)
        };
        h.rc = function (a) {
            delete this.u;
            this.g && this.xa("unauth", {}, function (b) {
                a(b.s, b.d)
            })
        };

        function nh(a) {
            var b = a.u;
            a.g && b && a.xa("auth", {
                cred: b.Od
            }, function (c) {
                var d = c.s;
                c = c.d || "error";
                "ok" !== d && a.u === b && delete a.u;
                b.hd ? "ok" !== d && b.Tb && b.Tb(d, c) : (b.hd = !0, b.Ib && b.Ib(d, c))
            })
        }
        h.ud = function (a, b) {
            var c = a.path.toString(),
                d = a.ra();
            this.f("Unlisten called for " + c + " " + d);
            if (mh(this, c, d) && this.g) {
                var e = gg(a.F);
                this.f("Unlisten on " + c + " for " + d);
                c = {
                    p: c
                };
                b && (c.q = e, c.t = b);
                this.xa("n", c)
            }
        };
        h.Sc = function (a, b, c) {
            this.g ? oh(this, "o", a, b, c) : this.ta.push({
                yb: a,
                action: "o",
                data: b,
                S: c
            })
        };
        h.pd = function (a, b, c) {
            this.g ? oh(this, "om", a, b, c) : this.ta.push({
                yb: a,
                action: "om",
                data: b,
                S: c
            })
        };
        h.gc = function (a, b) {
            this.g ? oh(this, "oc", a, null, b) : this.ta.push({
                yb: a,
                action: "oc",
                data: null,
                S: b
            })
        };

        function oh(a, b, c, d, e) {
            c = {
                p: c,
                d: d
            };
            a.f("onDisconnect " + b, c);
            a.xa(b, c, function (a) {
                e && setTimeout(function () {
                    e(a.s, a.d)
                }, Math.floor(0))
            })
        }
        h.Eb = function (a, b, c, d) {
            ph(this, "p", a, b, c, d)
        };
        h.od = function (a, b, c, d) {
            ph(this, "m", a, b, c, d)
        };

        function ph(a, b, c, d, e, f) {
            d = {
                p: c,
                d: d
            };
            m(f) && (d.h = f);
            a.m.push({
                action: b,
                request: d,
                S: e
            });
            a.Ha++;
            b = a.m.length - 1;
            a.g ? qh(a, b) : a.f("Buffering put: " + c)
        }
        function qh(a, b) {
            var c = a.m[b].action,
                d = a.m[b].request,
                e = a.m[b].S;
            a.m[b].ce = a.g;
            a.xa(c, d, function (d) {
                a.f(c + " response", d);
                delete a.m[b];
                a.Ha--;
                0 === a.Ha && (a.m = []);
                e && e(d.s, d.d)
            })
        }
        h.Uc = function (a) {
            if (this.g) {
                a = {
                    c: a
                };
                this.f("reportStats", a);
                var b = this;
                this.xa("s", a, function (a) {
                    "ok" !== a.s && b.f("reportStats", "Error sending stats: " + a.d)
                })
            }
        };
        h.Yd = function (a) {
            if ("r" in a) {
                this.f("from server: " + G(a));
                var b = a.r,
                    c = this.Rb[b];
                c && (delete this.Rb[b], c(a.b))
            } else {
                if ("error" in a) throw "A server-side error has occurred: " + a.error;
                "a" in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.dd(c.p, c.d, !1, c
                    .t) : "m" === b ? this.dd(c.p, c.d, !0, c.t) : "c" === b ? rh(this, c.p, c.q) : "ac" === b ? (a = c
                    .s, b = c.d, c = this.u, delete this.u, c && c.Tb && c.Tb(a, b)) : "sd" === b ? this.Yc ? this.Yc(c) :
                    "msg" in c && "undefined" !== typeof console && console.log("WILDDOG: " + c.msg.replace("\n",
                    "\nWILDDOG: ")) : od("Unrecognized action received from server: " + G(b) +
                    "\nAre you using the latest client?"))
            }
        };
        h.ie = function (a) {
            this.f("connection ready");
            this.g = !0;
            this.sa = (new Date).getTime();
            this.Dd({
                serverTimeOffset: a - (new Date).getTime()
            });
            a = {};
            a["sdk.js." + CLIENT_VERSION.replace(/\./g, "-")] = 1;
            ib() && (a["framework.cordova"] = 1);
            this.Uc(a);
            sh(this);
            this.cd(!0)
        };

        function jh(a, b) {
            C(!a.B, "Scheduling a connect when we're already connected/ing?");
            a.W && clearTimeout(a.W);
            a.W = setTimeout(function () {
                a.W = null;
                if (th(a)) {
                    a.f("Making a connection attempt");
                    a.wc = (new Date).getTime();
                    a.sa = null;
                    var b = q(a.Yd, a),
                        d = q(a.ie, a),
                        e = q(a.qd, a),
                        f = a.xc + ":" + kh++;
                    a.B = new bh(f, a.Ed, b, d, e)
                }
            }, Math.floor(b))
        }
        h.ae = function (a) {
            a && !this.ca && this.I === this.gb && (this.f("Window became visible.  Reducing delay."), this.I = 1E3,
                this.B || jh(this, 0));
            this.ca = a
        };
        h.$d = function (a) {
            a ? (this.f("Browser went online."), this.I = 1E3, this.B || jh(this, 0)) : (this.f(
                "Browser went offline.  Killing connection."), this.B && this.B.close())
        };
        h.qd = function () {
            this.f("data client disconnected");
            this.g = !1;
            this.B = null;
            for (var a = 0; a < this.m.length; a++) {
                var b = this.m[a];
                b && "h" in b.request && b.ce && (b.S && b.S("disconnect"), delete this.m[a], this.Ha--)
            }
            0 === this.Ha && (this.m = []);
            this.Rb = {};
            th(this) && (this.ca ? this.sa && (3E4 < (new Date).getTime() - this.sa && (this.I = 1E3), this.sa = null) :
                (this.f("Window isn't visible.  Delaying reconnect."), this.I = this.gb, this.wc = (new Date).getTime()),
                a = Math.max(0, this.I - ((new Date).getTime() - this.wc)), a *= Math.random(), this.f(
                "Trying to reconnect in " +
                a + "ms"), jh(this, a), this.I = Math.min(this.gb, 1.3 * this.I));
            this.cd(!1)
        };
        h.Ya = function () {
            this.vc = !0;
            this.B ? this.B.close() : (this.W && (clearTimeout(this.W), this.W = null), this.g && this.qd())
        };
        h.Cb = function () {
            this.vc = !1;
            this.I = 1E3;
            this.B || jh(this, 0)
        };

        function rh(a, b, c) {
            c = c ? qc(c, function (a) {
                return sd(a)
            }).join("$") : "default";
            (a = mh(a, b, c)) && a.S && a.S("permission_denied")
        }

        function mh(a, b, c) {
            b = (new z(b)).toString();
            var d;
            m(a.ea[b]) ? (d = a.ea[b][c], delete a.ea[b][c], 0 === gc(a.ea[b]) && delete a.ea[b]) : d = void 0;
            return d
        }
        function sh(a) {
            nh(a);
            P(a.ea, function (b) {
                P(b, function (b) {
                    lh(a, b)
                })
            });
            for (var b = 0; b < a.m.length; b++) a.m[b] && qh(a, b);
            for (; a.ta.length;) b = a.ta.shift(), oh(a, b.action, b.yb, b.data, b.S)
        }
        function th(a) {
            var b;
            b = Me.Ua().f;
            return !a.vc && b
        };

        function uh(a, b) {
            this.I = a;
            this.ta = Bc(a);
            this.g = new Za;
            this.ca = 1;
            this.Ga = null;
            this.m;
            b || 0 <= ("object" === typeof window && window.navigator && window.navigator.userAgent || "").search(
                /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) ? (this.m =
                new mg(this.I, q(this.wd, this)), setTimeout(q(this.vd, this, !0), 0)) : this.m = this.Ga = new hh(this
                .I, q(this.wd, this), q(this.vd, this), q(this.ke, this));
            this.gb = Cc(a, q(function () {
                return new Aa(this.ta, this.m)
            }, this));
            this.u = new Oe;
            this.Ha =
                new Mb;
            var c = this;
            this.W = new Df({
                Zc: function (a, b, f, g) {
                    b = [];
                    f = c.Ha.o(a.path);
                    f.j() || (b = Ff(c.W, new sa(Bd, a.path, f)), setTimeout(function () {
                        g("ok")
                    }, 0));
                    return b
                },
                pc: ba
            });
            vh(this, "connected", !1);
            this.B = new Ja;
            this.U = new rg(a, q(this.m.U, this.m), q(this.m.rc, this.m), q(this.je, this));
            this.Zb = 0;
            this.Nc = null;
            this.f = new Df({
                Zc: function (a, b, f, g) {
                    c.m.nd(a, f, b, function (b, e) {
                        var f = g(b, e);
                        db(c.g, a.path, f)
                    });
                    return []
                },
                pc: function (a, b) {
                    c.m.ud(a, b)
                }
            })
        }
        h = uh.prototype;
        h.toString = function () {
            return (this.I.ab ? "https://" : "http://") + this.I.host
        };
        h.name = function () {
            return this.I.wb
        };

        function wh(a) {
            a = a.Ha.o(new z(".info/serverTimeOffset")).N() || 0;
            return (new Date).getTime() + a
        }
        function xh(a) {
            a = a = {
                timestamp: wh(a)
            };
            a.timestamp = a.timestamp || (new Date).getTime();
            return a
        }
        h.wd = function (a, b, c, d) {
            this.Zb++;
            var e = new z(a);
            b = this.Nc ? this.Nc(a, b) : b;
            a = [];
            d ? c ? (b = ec(b, function (a) {
                return D(a)
            }), a = Nf(this.f, e, b, d)) : (b = D(b), a = Jf(this.f, e, b, d)) : c ? (d = ec(b, function (a) {
                return D(a)
            }), a = If(this.f, e, d)) : (d = D(b), a = Ff(this.f, new sa(Bd, e, d)));
            d = e;
            0 < a.length && (d = yh(this, e));
            db(this.g, d, a)
        };
        h.vd = function (a) {
            vh(this, "connected", a);
            !1 === a && zh(this)
        };
        h.ke = function (a) {
            var b = this;
            td(a, function (a, d) {
                vh(b, d, a)
            })
        };
        h.je = function (a) {
            vh(this, "authenticated", a)
        };

        function vh(a, b, c) {
            b = new z("/.info/" + b);
            c = D(c);
            var d = a.Ha;
            d.mc = d.mc.M(b, c);
            c = Ff(a.W, new sa(Bd, b, c));
            db(a.g, b, c)
        }
        h.bb = function (a, b, c, d) {
            this.Qb("set", {
                path: a.toString(),
                value: b,
                te: c
            });
            var e = xh(this);
            b = D(b, c);
            var e = La(b, e),
                f = this.ca++,
                e = Ef(this.f, a, e, f, !0);
            $a(this.g, e);
            var g = this;
            this.m.Eb(a.toString(), b.N(!0), function (b, c) {
                var e = "ok" === b;
                e || S("set at " + a + " failed: " + b);
                e = Hf(g.f, f, !e);
                db(g.g, a, e);
                Ah(d, b, c)
            });
            e = Bh(this, a);
            yh(this, e);
            db(this.g, e, [])
        };
        h.update = function (a, b, c) {
            this.Qb("update", {
                path: a.toString(),
                value: b
            });
            var d = !0,
                e = xh(this),
                f = {};
            P(b, function (a, b) {
                d = !1;
                var c = D(a);
                f[b] = La(c, e)
            });
            if (d) fb("update() called with empty data.  Don't do anything."), Ah(c, "ok");
            else {
                var g = this.ca++,
                    k = Gf(this.f, a, f, g);
                $a(this.g, k);
                var l = this;
                this.m.od(a.toString(), b, function (b, d) {
                    var e = "ok" === b;
                    e || S("update at " + a + " failed: " + b);
                    var e = Hf(l.f, g, !e),
                        f = a;
                    0 < e.length && (f = yh(l, a));
                    db(l.g, f, e);
                    Ah(c, b, d)
                });
                b = Bh(this, a);
                yh(this, b);
                db(this.g, a, [])
            }
        };

        function zh(a) {
            a.Qb("onDisconnectEvents");
            var b = xh(a),
                c = [];
            Ka(Ia(a.B, b), t, function (b, e) {
                c = c.concat(Ff(a.f, new sa(Bd, b, e)));
                var f = Bh(a, b);
                yh(a, f)
            });
            a.B = new Ja;
            db(a.g, t, c)
        }
        h.gc = function (a, b) {
            var c = this;
            this.m.gc(a.toString(), function (d, e) {
                "ok" === d && ge(c.B, a);
                Ah(b, d, e)
            })
        };

        function Ch(a, b, c, d) {
            var e = D(c);
            a.m.Sc(b.toString(), e.N(!0), function (c, g) {
                "ok" === c && a.B.Ab(b, e);
                Ah(d, c, g)
            })
        }
        function Dh(a, b, c, d, e) {
            var f = D(c, d);
            a.m.Sc(b.toString(), f.N(!0), function (c, d) {
                "ok" === c && a.B.Ab(b, f);
                Ah(e, c, d)
            })
        }

        function Eh(a, b, c, d) {
            var e = !0,
                f;
            for (f in c) e = !1;
            e ? (fb("onDisconnect().update() called with empty data.  Don't do anything."), Ah(d, "ok")) : a.m.pd(b.toString(),
                c, function (e, f) {
                if ("ok" === e) for (var l in c) {
                        var n = D(c[l]);
                        a.B.Ab(b.G(l), n)
                }
                Ah(d, e, f)
            })
        }
        function Zg(a, b, c) {
            c = ".info" === B(b.path) ? a.W.hb(b, c) : a.f.hb(b, c);
            bb(a.g, b.path, c)
        }
        h.Ya = function () {
            this.Ga && this.Ga.Ya()
        };
        h.Cb = function () {
            this.Ga && this.Ga.Cb()
        };
        h.$c = function (a) {
            if ("undefined" !== typeof console) {
                a ? (this.sa || (this.sa = new ya(this.ta)), a = this.sa.get()) : a = this.ta.get();
                var b = rc(jc(a), function (a, b) {
                    return Math.max(b.length, a)
                }, 0),
                    c;
                for (c in a) {
                    for (var d = a[c], e = c.length; e < b + 2; e++) c += " ";
                    console.log(c + d)
                }
            }
        };
        h.ad = function (a) {
            var b = this.ta,
                c;
            m(c) || (c = 1);
            x(b.f, a) || (b.f[a] = 0);
            b.f[a] += c;
            this.gb.td[a] = !0
        };
        h.Qb = function (a) {
            var b = "";
            this.Ga && (b = this.Ga.xc + ":");
            fb(b, arguments)
        };

        function Ah(a, b, c) {
            a && gb(function () {
                if ("ok" == b) a(null);
                else {
                    var d = (b || "error").toUpperCase(),
                        e = d;
                    c && (e += ": " + c);
                    e = Error(e);
                    e.code = d;
                    a(e)
                }
            })
        };
        ma.ne;

        function Fh(a, b, c, d, e) {
            function f() {}
            a.Qb("transaction on " + b);
            var g = new V(a, b);
            g.Za("value", f);
            c = {
                path: b,
                update: c,
                S: d,
                status: null,
                rd: fd(),
                ed: e,
                sd: 0,
                sc: function () {
                    g.xb("value", f)
                },
                yc: null,
                ua: null,
                Wb: null,
                Xb: null,
                Yb: null
            };
            d = a.f.qa(b, void 0) || O;
            c.Wb = d;
            d = c.update(d.N());
            if (m(d)) {
                Jg("transaction failed: Data returned ", d, c.path);
                c.status = 1;
                e = Pe(a.u, b);
                var k = e.va() || [];
                k.push(c);
                Qe(e, k);
                "object" === typeof d && null !== d && x(d, ".priority") ? (k = J(d, ".priority"), C(Hg(k),
                    "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) :
                    k =
                    (a.f.qa(b) || O).J().N();
                e = xh(a);
                d = D(d, k);
                e = La(d, e);
                c.Xb = d;
                c.Yb = e;
                c.ua = a.ca++;
                c = Ef(a.f, b, e, c.ua, c.ed);
                db(a.g, b, c);
                Gh(a)
            } else c.sc(), c.Xb = null, c.Yb = null, c.S && (a = new U(c.Wb, new V(a, c.path), E), c.S(null, !1, a))
        }
        function Gh(a, b) {
            var c = b || a.u;
            b || Hh(a, c);
            if (null !== c.va()) {
                var d = Ih(a, c);
                C(0 < d.length, "Sending zero length transaction queue");
                sc(d, function (a) {
                    return 1 === a.status
                }) && Jh(a, c.path(), d)
            } else c.dc() && c.X(function (b) {
                    Gh(a, b)
                })
        }

        function Jh(a, b, c) {
            for (var d = qc(c, function (a) {
                return a.ua
            }), e = a.f.qa(b, d) || O, d = e, e = e.hash(), f = 0; f < c.length; f++) {
                var g = c[f];
                C(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
                g.status = 2;
                g.sd++;
                var k = A(b, g.path),
                    d = d.M(k, g.Xb)
            }
            d = d.N(!0);
            a.m.Eb(b.toString(), d, function (d) {
                a.Qb("transaction put response", {
                    path: b.toString(),
                    status: d
                });
                var e = [];
                if ("ok" === d) {
                    d = [];
                    for (f = 0; f < c.length; f++) {
                        c[f].status = 3;
                        e = e.concat(Hf(a.f, c[f].ua));
                        if (c[f].S) {
                            var g = c[f].Yb,
                                k = new V(a, c[f].path);
                            d.push(q(c[f].S,
                                null, null, !0, new U(g, k, E)))
                        }
                        c[f].sc()
                    }
                    Hh(a, Pe(a.u, b));
                    Gh(a);
                    db(a.g, b, e);
                    for (f = 0; f < d.length; f++) gb(d[f])
                } else {
                    if ("datastale" === d) for (f = 0; f < c.length; f++) c[f].status = 4 === c[f].status ? 5 : 1;
                    else for (S("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++) c[f].status =
                                5, c[f].yc = d;
                    yh(a, b)
                }
            }, e)
        }
        function yh(a, b) {
            var c = Kh(a, b),
                d = c.path(),
                c = Ih(a, c);
            Lh(a, c, d);
            return d
        }

        function Lh(a, b, c) {
            if (0 !== b.length) {
                for (var d = [], e = [], f = qc(b, function (a) {
                        return a.ua
                    }), g = 0; g < b.length; g++) {
                    var k = b[g],
                        l = A(c, k.path),
                        n = !1,
                        u;
                    C(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                    if (5 === k.status) n = !0, u = k.yc, e = e.concat(Hf(a.f, k.ua, !0));
                    else if (1 === k.status) if (25 <= k.sd) n = !0, u = "maxretry", e = e.concat(Hf(a.f, k.ua, !0));
                        else {
                            var y = a.f.qa(k.path, f) || O;
                            k.Wb = y;
                            var H = b[g].update(y.N());
                            m(H) ? (Jg("transaction failed: Data returned ", H, k.path), l = D(H), "object" === typeof H &&
                                null !=
                                H && x(H, ".priority") || (l = l.ba(y.J())), y = k.ua, H = xh(a), H = La(l, H), k.Xb =
                                l, k.Yb = H, k.ua = a.ca++, vc(f, y), e = e.concat(Ef(a.f, k.path, H, k.ua, k.ed)), e =
                                e.concat(Hf(a.f, y, !0))) : (n = !0, u = "nodata", e = e.concat(Hf(a.f, k.ua, !0)))
                        }
                    db(a.g, c, e);
                    e = [];
                    n && (b[g].status = 3, setTimeout(b[g].sc, Math.floor(0)), b[g].S && ("nodata" === u ? (k = new V(a,
                        b[g].path), d.push(q(b[g].S, null, null, !1, new U(b[g].Wb, k, E)))) : d.push(q(b[g].S, null,
                        Error(u), !1, null))))
                }
                Hh(a, a.u);
                for (g = 0; g < d.length; g++) gb(d[g]);
                Gh(a)
            }
        }

        function Kh(a, b) {
            for (var c, d = a.u; null !== (c = B(b)) && null === d.va();) d = Pe(d, c), b = r(b);
            return d
        }
        function Ih(a, b) {
            var c = [];
            Mh(a, b, c);
            c.sort(function (a, b) {
                return a.rd - b.rd
            });
            return c
        }
        function Mh(a, b, c) {
            var d = b.va();
            if (null !== d) for (var e = 0; e < d.length; e++) c.push(d[e]);
            b.X(function (b) {
                Mh(a, b, c)
            })
        }
        function Hh(a, b) {
            var c = b.va();
            if (c) {
                for (var d = 0, e = 0; e < c.length; e++) 3 !== c[e].status && (c[d] = c[e], d++);
                c.length = d;
                Qe(b, 0 < c.length ? c : null)
            }
            b.X(function (b) {
                Hh(a, b)
            })
        }

        function Bh(a, b) {
            var c = Kh(a, b).path(),
                d = Pe(a.u, b);
            Te(d, function (b) {
                Nh(a, b)
            });
            Nh(a, d);
            Se(d, function (b) {
                Nh(a, b)
            });
            return c
        }

        function Nh(a, b) {
            var c = b.va();
            if (null !== c) {
                for (var d = [], e = [], f = -1, g = 0; g < c.length; g++) 4 !== c[g].status && (2 === c[g].status ? (C(
                        f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].yc =
                        "set") : (C(1 === c[g].status, "Unexpected transaction status in abort"), c[g].sc(), e = e.concat(
                        Hf(a.f, c[g].ua, !0)), c[g].S && d.push(q(c[g].S, null, Error("set"), !1, null)))); - 1 === f ?
                    Qe(b, null) : c.length = f + 1;
                db(a.g, b.path(), e);
                for (g = 0; g < d.length; g++) gb(d[g])
            }
        };

        function Oh() {
            this.f = {};
            this.g = !1
        }
        ca(Oh);
        Oh.prototype.Ya = function () {
            for (var a in this.f) this.f[a].Ya()
        };
        Oh.prototype.interrupt = Oh.prototype.Ya;
        Oh.prototype.Cb = function () {
            for (var a in this.f) this.f[a].Cb()
        };
        Oh.prototype.resume = Oh.prototype.Cb;
        Oh.prototype.Gc = function () {
            this.g = !0
        };
        var X = {
            Rd: function () {
                $g.oe.Qd();
                $g.yd.re()
            }
        };
        X.forceLongPolling = X.Rd;
        X.Sd = function () {
            $g.yd.Qd()
        };
        X.forceWebSockets = X.Sd;
        X.ge = function (a, b) {
            a.A.Ga.Yc = b
        };
        X.setSecurityDebugCallback = X.ge;
        X.$c = function (a, b) {
            a.A.$c(b)
        };
        X.stats = X.$c;
        X.ad = function (a, b) {
            a.A.ad(b)
        };
        X.statsIncrementCounter = X.ad;
        X.Zb = function (a) {
            return a.A.Zb
        };
        X.dataUpdateCount = X.Zb;
        X.Ud = function (a, b) {
            a.A.Nc = b
        };
        X.interceptServerData = X.Ud;
        X.Zd = function (a) {
            new $b(a)
        };
        X.onPopupOpen = X.Zd;
        X.ee = function (a) {
            ub = a
        };
        X.setAuthenticationServer = X.ee;

        function Y(a, b) {
            this.f = a;
            this.oa = b
        }
        Y.prototype.cancel = function (a) {
            L("Wilddog.onDisconnect().cancel", 0, 1, arguments.length);
            N("Wilddog.onDisconnect().cancel", 1, a, !0);
            this.f.gc(this.oa, a || null)
        };
        Y.prototype.cancel = Y.prototype.cancel;
        Y.prototype.remove = function (a) {
            L("Wilddog.onDisconnect().remove", 0, 1, arguments.length);
            Qg("Wilddog.onDisconnect().remove", this.oa);
            N("Wilddog.onDisconnect().remove", 1, a, !0);
            Ch(this.f, this.oa, null, a)
        };
        Y.prototype.remove = Y.prototype.remove;
        Y.prototype.set = function (a, b) {
            L("Wilddog.onDisconnect().set", 1, 2, arguments.length);
            Qg("Wilddog.onDisconnect().set", this.oa);
            Ig("Wilddog.onDisconnect().set", a, this.oa, !1);
            N("Wilddog.onDisconnect().set", 2, b, !0);
            Ch(this.f, this.oa, a, b)
        };
        Y.prototype.set = Y.prototype.set;
        Y.prototype.bb = function (a, b, c) {
            L("Wilddog.onDisconnect().setWithPriority", 2, 3, arguments.length);
            Qg("Wilddog.onDisconnect().setWithPriority", this.oa);
            Ig("Wilddog.onDisconnect().setWithPriority", a, this.oa, !1);
            Mg("Wilddog.onDisconnect().setWithPriority", 2, b);
            N("Wilddog.onDisconnect().setWithPriority", 3, c, !0);
            Dh(this.f, this.oa, a, b, c)
        };
        Y.prototype.setWithPriority = Y.prototype.bb;
        Y.prototype.update = function (a, b) {
            L("Wilddog.onDisconnect().update", 1, 2, arguments.length);
            Qg("Wilddog.onDisconnect().update", this.oa);
            if (ea(a)) {
                for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
                a = c;
                S(
                    "Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
            }
            Lg("Wilddog.onDisconnect().update", a, this.oa);
            N("Wilddog.onDisconnect().update", 2, b, !0);
            Eh(this.f,
                this.oa, a, b)
        };
        Y.prototype.update = Y.prototype.update;
        var Z = {};
        Z.Fb = hh;
        Z.DataConnection = Z.Fb;
        hh.prototype.Cd = function (a, b) {
            this.xa("q", {
                p: a
            }, b)
        };
        Z.Fb.prototype.simpleListen = Z.Fb.prototype.Cd;
        hh.prototype.Ad = function (a, b) {
            this.xa("echo", {
                d: a
            }, b)
        };
        Z.Fb.prototype.echo = Z.Fb.prototype.Ad;
        hh.prototype.interrupt = hh.prototype.Ya;
        Z.Fd = bh;
        Z.RealTimeConnection = Z.Fd;
        bh.prototype.sendRequest = bh.prototype.xa;
        bh.prototype.close = bh.prototype.close;
        Z.Td = function (a) {
            var b = hh.prototype.Eb;
            hh.prototype.Eb = function (c, d, e, f) {
                m(f) && (f = a());
                b.call(this, c, d, e, f)
            };
            return function () {
                hh.prototype.Eb = b
            }
        };
        Z.hijackHash = Z.Td;
        Z.zd = sb;
        Z.ConnectionTarget = Z.zd;
        Z.ra = function (a) {
            return a.ra()
        };
        Z.queryIdentifier = Z.ra;
        Z.Vd = function (a) {
            return a.A.Ga.ea
        };
        Z.listens = Z.Vd;
        Z.Gc = function (a) {
            a.Gc()
        };
        Z.forceRestClient = Z.Gc;

        function V(a, b) {
            var c, d, e;
            if (a instanceof uh) c = a, d = b;
            else {
                L("new Wilddog", 1, 2, arguments.length);
                d = Tb(arguments[0]);
                c = d.he;
                "wilddog" === d.domain && pd(d.host +
                    " is no longer supported. Please use <YOUR WILDDOG>.wilddogio.com instead");
                c || pd("Cannot parse Wilddog url. Please use https://<YOUR WILDDOG>.wilddogio.com");
                d.ab || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location
                    .protocol.indexOf("https:") && S(
                    "Insecure Wilddog access from a secure page. Please use https in calls to new Wilddog().");
                c = new sb(d.host, d.ab, c);
                d = new z(d.yb);
                e = d.toString();
                var f;
                !(f = !p(c.host) || 0 === c.host.length || !Gg(c.wb)) && (f = 0 !== e.length) && (e && (e = e.replace(
                    /^\/*\.info(\/|$)/, "/")), f = !(p(e) && 0 !== e.length && !Fg.test(e)));
                if (f) throw Error(M("new Wilddog", 1, !1) +
                        'must be a valid wilddog URL and the path can\'t contain ".", "#", "$", "[", or "]".');
                if (b) if (b instanceof Oh) e = b;
                    else if (p(b)) e = Oh.Ua(), c.ic = b;
                else throw Error("Expected a valid Wilddog.Context for second argument to new Wilddog()");
                else e = Oh.Ua();
                f = c.toString();
                var g = J(e.f, f);
                g || (g = new uh(c, e.g), e.f[f] = g);
                c = g
            }
            W.call(this, c, d, dg, !1)
        }
        la(V, W);
        V.prototype.name = function () {
            S("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");
            L("Wilddog.name", 0, 0, arguments.length);
            return this.key()
        };
        V.prototype.name = V.prototype.name;
        V.prototype.key = function () {
            L("Wilddog.key", 0, 0, arguments.length);
            return this.path.j() ? null : Ca(this.path)
        };
        V.prototype.key = V.prototype.key;
        V.prototype.G = function (a) {
            L("Wilddog.child", 1, 1, arguments.length);
            if (fa(a)) a = String(a);
            else if (!(a instanceof z)) if (null === B(this.path)) {
                    var b = a;
                    b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
                    Pg("Wilddog.child", b)
                } else Pg("Wilddog.child", a);
            return new V(this.A, this.path.G(a))
        };
        V.prototype.child = V.prototype.G;
        V.prototype.parent = function () {
            L("Wilddog.parent", 0, 0, arguments.length);
            var a = this.path.parent();
            return null === a ? null : new V(this.A, a)
        };
        V.prototype.parent = V.prototype.parent;
        V.prototype.root = function () {
            L("Wilddog.ref", 0, 0, arguments.length);
            for (var a = this; null !== a.parent();) a = a.parent();
            return a
        };
        V.prototype.root = V.prototype.root;
        V.prototype.set = function (a, b) {
            L("Wilddog.set", 1, 2, arguments.length);
            Qg("Wilddog.set", this.path);
            Ig("Wilddog.set", a, this.path, !1);
            N("Wilddog.set", 2, b, !0);
            this.A.bb(this.path, a, null, b || null)
        };
        V.prototype.set = V.prototype.set;
        V.prototype.update = function (a, b) {
            L("Wilddog.update", 1, 2, arguments.length);
            Qg("Wilddog.update", this.path);
            if (ea(a)) {
                for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
                a = c;
                S(
                    "Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
            }
            Lg("Wilddog.update", a, this.path);
            N("Wilddog.update", 2, b, !0);
            this.A.update(this.path, a, b || null)
        };
        V.prototype.update = V.prototype.update;
        V.prototype.bb = function (a, b, c) {
            L("Wilddog.setWithPriority", 2, 3, arguments.length);
            Qg("Wilddog.setWithPriority", this.path);
            Ig("Wilddog.setWithPriority", a, this.path, !1);
            Mg("Wilddog.setWithPriority", 2, b);
            N("Wilddog.setWithPriority", 3, c, !0);
            if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.setWithPriority failed: " + this.key() +
                    " is a read-only object.";
            this.A.bb(this.path, a, b, c || null)
        };
        V.prototype.setWithPriority = V.prototype.bb;
        V.prototype.remove = function (a) {
            L("Wilddog.remove", 0, 1, arguments.length);
            Qg("Wilddog.remove", this.path);
            N("Wilddog.remove", 1, a, !0);
            this.set(null, a)
        };
        V.prototype.remove = V.prototype.remove;
        V.prototype.transaction = function (a, b, c) {
            L("Wilddog.transaction", 1, 3, arguments.length);
            Qg("Wilddog.transaction", this.path);
            N("Wilddog.transaction", 1, a, !1);
            N("Wilddog.transaction", 2, b, !0);
            if (m(c) && "boolean" != typeof c) throw Error(M("Wilddog.transaction", 3, !0) + "must be a boolean.");
            if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.transaction failed: " + this.key() +
                    " is a read-only object.";
            "undefined" === typeof c && (c = !0);
            Fh(this.A, this.path, a, b || null, c)
        };
        V.prototype.transaction = V.prototype.transaction;
        V.prototype.fe = function (a, b) {
            L("Wilddog.setPriority", 1, 2, arguments.length);
            Qg("Wilddog.setPriority", this.path);
            Mg("Wilddog.setPriority", 1, a);
            N("Wilddog.setPriority", 2, b, !0);
            this.A.bb(this.path.G(".priority"), a, null, b)
        };
        V.prototype.setPriority = V.prototype.fe;
        V.prototype.push = function (a, b) {
            L("Wilddog.push", 0, 2, arguments.length);
            Qg("Wilddog.push", this.path);
            Ig("Wilddog.push", a, this.path, !0);
            N("Wilddog.push", 2, b, !0);
            var c = wh(this.A),
                c = Ve(c),
                c = this.G(c);
            "undefined" !== typeof a && null !== a && c.set(a, b);
            return c
        };
        V.prototype.push = V.prototype.push;
        V.prototype.onDisconnect = function () {
            Qg("Wilddog.onDisconnect", this.path);
            return new Y(this.A, this.path)
        };
        V.prototype.onDisconnect = V.prototype.onDisconnect;
        V.prototype.U = function (a, b, c) {
            S("WilddogRef.auth() being deprecated. Please use WilddogRef.authWithCustomToken() instead.");
            L("Wilddog.auth", 1, 3, arguments.length);
            Rg("Wilddog.auth", a);
            N("Wilddog.auth", 2, b, !0);
            N("Wilddog.auth", 3, b, !0);
            xg(this.A.U, a, {}, {
                remember: "none"
            }, b, c)
        };
        V.prototype.auth = V.prototype.U;
        V.prototype.rc = function (a) {
            L("Wilddog.unauth", 0, 1, arguments.length);
            N("Wilddog.unauth", 1, a, !0);
            yg(this.A.U, a)
        };
        V.prototype.unauth = V.prototype.rc;
        V.prototype.Ic = function () {
            L("Wilddog.getAuth", 0, 0, arguments.length);
            return this.A.U.Ic()
        };
        V.prototype.getAuth = V.prototype.Ic;
        V.prototype.Xd = function (a, b) {
            L("Wilddog.onAuth", 1, 2, arguments.length);
            N("Wilddog.onAuth", 1, a, !1);
            zb("Wilddog.onAuth", 2, b);
            this.A.U.Za("auth_status", a, b)
        };
        V.prototype.onAuth = V.prototype.Xd;
        V.prototype.Wd = function (a, b) {
            L("Wilddog.offAuth", 1, 2, arguments.length);
            N("Wilddog.offAuth", 1, a, !1);
            zb("Wilddog.offAuth", 2, b);
            this.A.U.xb("auth_status", a, b)
        };
        V.prototype.offAuth = V.prototype.Wd;
        V.prototype.Hd = function (a, b, c) {
            L("Wilddog.authWithCustomToken", 2, 3, arguments.length);
            Rg("Wilddog.authWithCustomToken", a);
            N("Wilddog.authWithCustomToken", 2, b, !1);
            Tg("Wilddog.authWithCustomToken", 3, c, !0);
            xg(this.A.U, a, {}, c || {}, b)
        };
        V.prototype.authWithCustomToken = V.prototype.Hd;
        V.prototype.Id = function (a, b, c) {
            L("Wilddog.authWithOAuthPopup", 2, 3, arguments.length);
            Sg("Wilddog.authWithOAuthPopup", 1, a);
            N("Wilddog.authWithOAuthPopup", 2, b, !1);
            Tg("Wilddog.authWithOAuthPopup", 3, c, !0);
            Cg(this.A.U, a, c, b)
        };
        V.prototype.authWithOAuthPopup = V.prototype.Id;
        V.prototype.Jd = function (a, b, c) {
            L("Wilddog.authWithOAuthRedirect", 2, 3, arguments.length);
            Sg("Wilddog.authWithOAuthRedirect", 1, a);
            N("Wilddog.authWithOAuthRedirect", 2, b, !1);
            Tg("Wilddog.authWithOAuthRedirect", 3, c, !0);
            var d = this.A.U;
            Ag(d);
            var e = [bc],
                f = xb(c);
            "anonymous" === a || "wilddog" === a ? T(b, I("TRANSPORT_UNAVAILABLE")) : (K.set("redirect_client_options",
                f.Vb), Bg(d, e, "/auth/" + a, f, b))
        };
        V.prototype.authWithOAuthRedirect = V.prototype.Jd;
        V.prototype.Kd = function (a, b, c, d) {
            L("Wilddog.authWithOAuthToken", 3, 4, arguments.length);
            Sg("Wilddog.authWithOAuthToken", 1, a);
            N("Wilddog.authWithOAuthToken", 3, c, !1);
            Tg("Wilddog.authWithOAuthToken", 4, d, !0);
            p(b) ? (Sg("Wilddog.authWithOAuthToken", 2, b), zg(this.A.U, a + "/token", {
                access_token: b
            }, d, c)) : (Tg("Wilddog.authWithOAuthToken", 2, b, !1), zg(this.A.U, a + "/token", b, d, c))
        };
        V.prototype.authWithOAuthToken = V.prototype.Kd;
        V.prototype.Gd = function (a, b) {
            L("Wilddog.authAnonymously", 1, 2, arguments.length);
            N("Wilddog.authAnonymously", 1, a, !1);
            Tg("Wilddog.authAnonymously", 2, b, !0);
            zg(this.A.U, "anonymous", {}, b, a)
        };
        V.prototype.authAnonymously = V.prototype.Gd;
        V.prototype.Ld = function (a, b, c) {
            L("Wilddog.authWithPassword", 2, 3, arguments.length);
            Tg("Wilddog.authWithPassword", 1, a, !1);
            Ug("Wilddog.authWithPassword", a, "email");
            Ug("Wilddog.authWithPassword", a, "password");
            N("Wilddog.authAnonymously", 2, b, !1);
            Tg("Wilddog.authAnonymously", 3, c, !0);
            zg(this.A.U, "password", a, c, b)
        };
        V.prototype.authWithPassword = V.prototype.Ld;
        V.prototype.Ec = function (a, b) {
            L("Wilddog.createUser", 2, 2, arguments.length);
            Tg("Wilddog.createUser", 1, a, !1);
            Ug("Wilddog.createUser", a, "email");
            Ug("Wilddog.createUser", a, "password");
            N("Wilddog.createUser", 2, b, !1);
            this.A.U.Ec(a, b)
        };
        V.prototype.createUser = V.prototype.Ec;
        V.prototype.Tc = function (a, b) {
            L("Wilddog.removeUser", 2, 2, arguments.length);
            Tg("Wilddog.removeUser", 1, a, !1);
            Ug("Wilddog.removeUser", a, "email");
            Ug("Wilddog.removeUser", a, "password");
            N("Wilddog.removeUser", 2, b, !1);
            this.A.U.Tc(a, b)
        };
        V.prototype.removeUser = V.prototype.Tc;
        V.prototype.Bc = function (a, b) {
            L("Wilddog.changePassword", 2, 2, arguments.length);
            Tg("Wilddog.changePassword", 1, a, !1);
            Ug("Wilddog.changePassword", a, "email");
            Ug("Wilddog.changePassword", a, "oldPassword");
            Ug("Wilddog.changePassword", a, "newPassword");
            N("Wilddog.changePassword", 2, b, !1);
            this.A.U.Bc(a, b)
        };
        V.prototype.changePassword = V.prototype.Bc;
        V.prototype.Ac = function (a, b) {
            L("Wilddog.changeEmail", 2, 2, arguments.length);
            Tg("Wilddog.changeEmail", 1, a, !1);
            Ug("Wilddog.changeEmail", a, "oldEmail");
            Ug("Wilddog.changeEmail", a, "newEmail");
            Ug("Wilddog.changeEmail", a, "password");
            N("Wilddog.changeEmail", 2, b, !1);
            this.A.U.Ac(a, b)
        };
        V.prototype.changeEmail = V.prototype.Ac;
        V.prototype.Vc = function (a, b) {
            L("Wilddog.resetPassword", 2, 2, arguments.length);
            Tg("Wilddog.resetPassword", 1, a, !1);
            Ug("Wilddog.resetPassword", a, "email");
            N("Wilddog.resetPassword", 2, b, !1);
            this.A.U.Vc(a, b)
        };
        V.prototype.resetPassword = V.prototype.Vc;

        function md(a, b) {
            C(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
            !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? eb = q(console.log,
                console) : "object" === typeof console.log && (eb = function (a) {
                console.log(a)
            })), b && K.set("logging_enabled", !0)) : a ? eb = a : (eb = null, K.remove("logging_enabled"))
        }
        var hd = CLIENT_VERSION;
        V.goOffline = function () {
            L("Wilddog.goOffline", 0, 0, arguments.length);
            Oh.Ua().Ya()
        };
        V.goOnline = function () {
            L("Wilddog.goOnline", 0, 0, arguments.length);
            Oh.Ua().Cb()
        };
        V.enableLogging = md;
        V.ServerValue = {
            TIMESTAMP: {
                ".sv": "timestamp"
            }
        };
        V.SDK_VERSION = hd;
        V.INTERNAL = X;
        V.TEST_ACCESS = Z;
        1 != NODE_CLIENT ? ("object" == typeof module && module.exports && (module.exports = V), "function" == typeof define &&
            define.amd && define("Wilddog", [], function () {
            return V
        }), window ? window.Wilddog = V : WorkerGlobalScope && self && (self.Wilddog = V)) : module.exports = V;
    };
    ns.wrapper(ns.goog, ns.wd)
})({
    goog: {},
    wd: {}
})
