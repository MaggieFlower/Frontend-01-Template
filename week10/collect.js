let allAPI = Object.getOwnPropertyNames(window)
console.log(allAPI.length)
// ECMA 262
let arrECMA262 = ["String", "Symbol", "Date", "Promise", "RegExp", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "globalThis", "JSON", "Math", "console", 'Boolean', 'undefined', 'NaN', 'Infinity', 'parseInt', 'parseFloat', 'Number', 'Array', 'Function', 'Object', "ArrayBuffer", "Uint8Array", "Int8Array", "Uint16Array", "Int16Array", "Uint32Array", "Int32Array", "Float32Array", "Float64Array", "Uint8ClampedArray", "BigUint64Array", "BigInt64Array", "DataView", "Map", "BigInt", "Set", "WeakMap", "WeakSet", "Proxy", "Reflect", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape", "eval", "isFinite", "isNaN"]
allAPI = allAPI.filter(each => {
  return arrECMA262.indexOf(each) == -1
})
console.log(allAPI.length)
// 浏览器控制台, ['console']
// ECMA-402
let arrECMA402 = ['Intl']
// Khronos
let arrKhronos = ["WebGLVertexArrayObject", "WebGLUniformLocation", "WebGLTransformFeedback", "WebGLTexture", "WebGLSync", "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler", "WebGLRenderingContext", "WebGLRenderbuffer", "WebGLQuery", "WebGLProgram", "WebGLFramebuffer", "WebGLContextEvent", "WebGLBuffer", "WebGLActiveInfo", "WebGL2RenderingContext"]
allAPI = allAPI.filter(each => {
  return arrKhronos.indexOf(each) == -1
})
console.log(allAPI.length)

let arrW3CCR = ['WaveShaperNode', "RTCTrackEvent", "RTCStatsReport", "RTCSessionDescription", "RTCSctpTransport", "RTCRtpTransceiver", "RTCRtpSender", "RTCRtpReceiver", "RTCPeerConnectionIceEvent", "RTCPeerConnectionIceErrorEvent", "RTCPeerConnection", "RTCIceCandidate", "RTCErrorEvent", "RTCError", "RTCDtlsTransport", "RTCDataChannelEvent", "RTCDataChannel", "RTCDTMFToneChangeEvent", "RTCDTMFSender", "RTCCertificate", "BaseAudioContext", "AudioWorkletNode", "AudioScheduledSourceNode", "AudioProcessingEvent", "AudioParamMap", "AudioParam", "AudioNode", "AudioListener", "AudioDestinationNode", "AudioContext", "AudioBufferSourceNode", "AudioBuffer", "SVGViewElement", "SVGUseElement", "SVGUnitTypes", "SVGTransformList", "SVGTransform", "SVGTitleElement", "SVGTextPositioningElement", "SVGTextPathElement", "SVGTextElement", "SVGTextContentElement", "SVGTSpanElement", "SVGSymbolElement", "SVGSwitchElement", "SVGStyleElement", "SVGStringList", "SVGStopElement", "SVGSetElement", "SVGScriptElement", "SVGSVGElement", "SVGRectElement", "SVGRect", "SVGRadialGradientElement", "SVGPreserveAspectRatio", "SVGPolylineElement", "SVGPolygonElement", "SVGPointList", "SVGPoint", "SVGPatternElement", "SVGPathElement", "SVGNumberList", "SVGNumber", "SVGMetadataElement", "SVGMatrix", "SVGMaskElement", "SVGMarkerElement", "SVGMPathElement", "SVGLinearGradientElement", "SVGLineElement", "SVGLengthList", "SVGLength", "SVGImageElement", "SVGGraphicsElement", "SVGGradientElement", "SVGGeometryElement", "SVGGElement", "SVGForeignObjectElement", "SVGFilterElement", "SVGFETurbulenceElement", "SVGFETileElement", "SVGFESpotLightElement", "SVGFESpecularLightingElement", "SVGFEPointLightElement", "SVGFEOffsetElement", "SVGFEMorphologyElement", "SVGFEMergeNodeElement", "SVGFEMergeElement", "SVGFEImageElement", "SVGFEGaussianBlurElement", "SVGFEFuncRElement", "SVGFEFuncGElement", "SVGFEFuncBElement", "SVGFEFuncAElement", "SVGFEFloodElement", "SVGFEDropShadowElement", "SVGFEDistantLightElement", "SVGFEDisplacementMapElement", "SVGFEDiffuseLightingElement", "SVGFEConvolveMatrixElement", "SVGFECompositeElement", "SVGFEComponentTransferElement", "SVGFEColorMatrixElement", "SVGFEBlendElement", "SVGEllipseElement", "SVGElement", "SVGDescElement", "SVGDefsElement", "SVGComponentTransferFunctionElement", "SVGClipPathElement", "SVGCircleElement", "SVGAnimationElement", "SVGAnimatedTransformList", "SVGAnimatedString", "SVGAnimatedRect", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedNumberList", "SVGAnimatedNumber", "SVGAnimatedLengthList", "SVGAnimatedLength", "SVGAnimatedInteger", "SVGAnimatedEnumeration", "SVGAnimatedBoolean", "SVGAnimatedAngle", "SVGAnimateTransformElement", "SVGAnimateMotionElement", "SVGAnimateElement", "SVGAngle", "SVGAElement", ' PerformanceTiming', "CSSVariableReferenceValue", "CSSUnparsedValue", "CSSUnitValue", "CSSTranslate", "CSSTransformValue", "CSSTransformComponent", "CSSSupportsRule", "CSSStyleValue", "CSSStyleSheet", "CSSStyleRule", "CSSStyleDeclaration", "CSSSkewY", "CSSSkewX", "CSSSkew", "CSSScale", "CSSRuleList", "CSSRule", "CSSRotate", "CSSPositionValue", "CSSPerspective", "CSSPageRule", "CSSNumericValue", "CSSNumericArray", "CSSNamespaceRule", "CSSMediaRule", "CSSMatrixComponent", "CSSMathValue", "CSSMathSum", "CSSMathProduct", "CSSMathNegate", "CSSMathMin", "CSSMathMax", "CSSMathInvert", "CSSKeywordValue", "CSSKeyframesRule", "CSSKeyframeRule", "CSSImportRule", "CSSImageValue", "CSSGroupingRule", "CSSFontFaceRule", "CSS", "CSSConditionRule", 'Animation', 'AnimationEffect', 'AnimationEvent', "MediaDeviceInfo", "MediaDevices", "MediaKeyMessageEvent", "MediaKeys", "MediaKeySession", "MediaKeyStatusMap", "MediaKeySystemAccess", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent", "MIDIOutput", "MIDIOutputMap", "MIDIPort", "Presentation", "PresentationAvailability", "PresentationConnection", "PresentationConnectionAvailableEvent", "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver", "PresentationRequest", "onmouseenter", "onmousewheel", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove", "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "onselectstart", "onselectionchange", "onanimationend", "onanimationiteration", "onanimationstart", "ontransitionend", "StyleSheetList", "StyleSheet", "StylePropertyMapReadOnly", "StylePropertyMap"]

allAPI = allAPI.filter(each => {
  return arrW3CCR.indexOf(each) == -1
})
console.log(allAPI.length)

// whatWG
let arrWhatWg = ['console', 'formData', {
  'compatibility': ["-webkit-device-pixel-ratio", "-webkit-transform-3d", "-webkit-background-clip", "-webkit-text-fill-color", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "-webkit-text-stroke", "-webkit-device-pixel-ratio", "-webkit-device-pixel-ratio", "-webkit-device-pixel-ratio", "-webkit-transform-3d", "-webkit-transform-3d", "align-items", "align-content", "align-self", "animation-name", "animation-duration", "animation-timing-function", "animation-iteration-count", "animation-direction", "animation-play-state", "animation-delay", "animation-fill-mode", "animation", "backface-visibility", "background-origin", "background-size", "border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "border-radius", "box-shadow", "box-sizing", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "filter", "justify-content", "mask", "mask-border", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-origin", "mask-position", "mask-repeat", "mask-size", "order", "perspective", "perspective-origin", "transform-origin", "transform-style", "transform", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "transition", "text-size-adjust", "-webkit-appearance", "align-items", "flex-grow", "order", "flex-direction", "justify-content", "background-clip", "-webkit-background-clip", "-webkit-text-fill-color", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "-webkit-text-stroke"],
  'dom': ["Event", "Window", "CustomEvent", "EventTarget", "AbortController", "AbortSignal", "AbortController", "AbortSignal", "NonElementParentNode", "DocumentOrShadowRoot", "ParentNode", "NonDocumentTypeChildNode", "ChildNode", "Slottable", "NodeList", "HTMLCollection", "NodeList", "HTMLCollection", "MutationObserver", "MutationRecord", "Node", "Document", "DOMImplementation", "DocumentType", "DocumentFragment", "ShadowRoot", "Element", "NamedNodeMap", "Attr", "CharacterData", "Text", "CDATASection", "ProcessingInstruction", "Comment", "AbstractRange", "StaticRange", "Range", "NodeIterator", "TreeWalker", "NodeFilter", "DOMTokenList", "XPathResult", "XPathExpression", "XPathEvaluatorBase", "XPathEvaluator"],
  'encoding': ["TextDecoderCommon", "TextDecoder", "TextEncoderCommon", "TextEncoder", "GenericTransformStream", "TextDecoderStream", "TextEncoderStream"],
  'fetch': [],
  'fullscreen': ['requestFullscreen', 'exitFullscreen'],
  'html': ['DataTransfer ', 'DataTransferItemList ', 'DataTransferItem ', 'HTMLAllCollection', 'HTMLFormControlsCollection', 'HTMLOptionsCollection', 'DOMStringList', 'DocumentOrShadowRoot', 'TrackEvent', 'ImageBitmapRenderingContext', ' OffscreenCanvas ', 'CustomElementRegistry', 'ElementInternals', 'DataTransfer', 'DataTransferItemList ', 'DataTransferItem ', 'DragEvent', 'History', 'Location', 'ProgressEvent', ' TrackEvent', 'SubmitEvent', 'FormDataEvent', 'OffscreenCanvas', ' DragEvent', 'PopStateEvent', 'HashChangeEvent', 'PageTransitionEvent', 'BeforeUnloadEvent', 'ErrorEvent', 'PromiseRejectionEvent', 'MessageEvent', 'EventSource ', 'WebSocket', 'CloseEvent', 'WorkerGlobalScope', 'DedicatedWorkerGlobalScope', ' SharedWorkerGlobalScope ', 'Worker', 'SharedWorker', 'Navigator', 'WorkerNavigator', 'WorkerLocation', "onabort", "onauxclick", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "EventHandler", "LegacyLenientThis", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange", "onlanguagechange", "onmessage", "onmessageerror", "onoffline", "ononline", "onpagehide", "onpageshow", "onpopstate", "onrejectionhandled", "onstorage", "onunhandledrejection", "onunload", "oncopy", "oncut", "onpaste", 'onmousewheel', 'onmouseenter'],
  'other': ["HTMLMarqueeElement", "HTMLElement", "HTMLConstructor", "HTMLFrameSetElement", "HTMLElement", "HTMLConstructor", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLElement", "HTMLConstructor", "HTMLAnchorElement", "HTMLAreaElement", "HTMLBodyElement", "HTMLBRElement", "HTMLTableCaptionElement", "HTMLTableColElement", "HTMLDirectoryElement", "HTMLElement", "HTMLConstructor", "HTMLDivElement", "HTMLDListElement", "HTMLEmbedElement", "HTMLFontElement", "HTMLElement", "HTMLConstructor", "HTMLHeadingElement", "HTMLHRElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement", "HTMLInputElement", "HTMLLegendElement", "HTMLLIElement", "HTMLLinkElement", "HTMLMenuElement", "HTMLMetaElement", "HTMLObjectElement", "HTMLOListElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLPreElement", "HTMLStyleElement", "HTMLScriptElement", "HTMLTableElement", "HTMLTableSectionElement", "HTMLTableCellElement", "HTMLTableRowElement", "HTMLUListElement", "HTMLCollection", "HTMLCollection", "HTMLAllCollection", "HTMLVideoElement", "HTMLUnknownElement", "HTMLTrackElement", "HTMLTitleElement", "HTMLTimeElement", "HTMLTextAreaElement", "HTMLTemplateElement", "HTMLSpanElement", "HTMLSourceElement", "HTMLSlotElement", "HTMLShadowElement", "HTMLSelectElement", "HTMLQuoteElement", "HTMLProgressElement", "HTMLPictureElement", "HTMLOutputElement", "HTMLOptionElement", "HTMLOptGroupElement", "HTMLModElement", "HTMLMeterElement", "HTMLMediaElement", "HTMLMapElement", "HTMLLabelElement", "HTMLHeadElement", "HTMLFormElement", "HTMLFieldSetElement", "HTMLDocument", "HTMLDialogElement", "HTMLDetailsElement", "HTMLDataListElement", "HTMLDataElement", "HTMLContentElement", "HTMLCanvasElement", "HTMLButtonElement", "HTMLBaseElement", "HTMLAudioElement"],
  'mimyType': ["MimeType", "MimeTypeArray", "MediaStreamTrackEvent", "MediaStreamTrack", "MediaStreamEvent", "MediaStream", "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode", "MediaSettingsRange", "MediaRecorder", "MediaEncryptedEvent", "MediaElementAudioSourceNode", "MediaCapabilities"],
  'stream': ["ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController", "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"],
  'Notification': [],
  'XMLHttpRequest': {
    'request': ['open', 'setRequestHeader', 'timeout', 'withCredentials', ' upload', 'send', 'abort', "XMLHttpRequestUpload", "XMLHttpRequestEventTarget", "XMLHttpRequest"],
    'reaponse': ["responseURL", "status", "statusText", "getResponseHeader", "getAllResponseHeaders", "overrideMimeType", "responseType", "response", "responseText", "responseXML"]
  },
  'Storage': ['Storage', 'StorageManager', 'StorageEvent', 'localStorage', 'sessionStorage']
}]
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].compatibility.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].dom.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].encoding.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].fullscreen.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].html.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].other.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].mimyType.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].stream.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].XMLHttpRequest.request.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].XMLHttpRequest.reaponse.indexOf(each) == -1
})
allAPI = allAPI.filter(each => {
  return arrWhatWg[2].Storage.indexOf(each) == -1
})
console.log(allAPI) // 整理后剩余393个api