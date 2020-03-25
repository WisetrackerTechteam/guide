# Objective-C 가이드

## 1. SDK 다운로드 및 설치

### 1.1 SDK 다운로드

#### XCode CocoaPod 환경에서 SDK 다운로드 방법

XCode 프로젝트 파일중 Podfile 파일에 다음과 같이 SDK를 추가합니다

```bat
pod 'RW'
```

기존에 SDK를 한번 설치한 경우에는 설치할SDK 버전을 표시해야 하는 경우도 있습니다. 아래와 같이 설치할 SDK버전을 명시적으로 표시하면 됩니다.

```
pod 'RW', '~> 1.0.3'
```

Podfile 에 해당라인을 추가한 후 Terminal 프로그램을 실행하여 다음의 명령을 수행합니다

```bat
cmd> pod install
```

정상적으로 설치가 되면 아래와 같은 폴더 구조를 확인할 수 있습니다.

![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/rw_podinstall.png)

### 1.2 SDK 세팅

XCode 프로젝트의 info.plist 파일에 제공받은 App Analytics Key 정보를 추가합니다.
info.plist 파일을 open할때 'Property list'가 아니라 'Source Code'로 open한 후 제공받으신 Key를 **Ctrl+V** 하시면 됩니다.
제공받은 Key값은 아래의 예시와 같이 xml 형태를 가지고 있는 데이터 입니다.

```xml
<key>dotAuthorizationKey</key>
<dict>
	<key>domain</key>
	<string>http://collector.naver.wisetracker.co.kr</string>
	<key>serviceNumber</key>
	<string>103</string>
	<key>expireDate</key>
	<string>14</string>
	<key>isDebug</key>
	<string>true</string>
	<key>isInstallRetention</key>
	<string>true</string>
	<key>isFingerPrint</key>
	<string>true</string>
	<key>accessToken</key>
	<string></string>
	<key>useMode</key>
	<string>2</string>
</dict>
```

위의 Key 중에 isDebug는 collector 로 전송되는 분석 데이터를 Android Stuio 와 Xcode 에서 확인할 수 있게 해주는 boolean 변수로 사용되고 있습니다
SDK를 적용해야 하는 앱 개발자는 이 값을 true로 설정하고, SDK의 기본 적용 및 추가 분석 코드 적용 과정에서 사용할 수 있습니다
( 예를 들면 이 값을 true로 적용하여, 분석 대상이 되는 앱에 적용하여 build를 하면 Android 의 경우 logcat에서, iOS 의 경우 debug console에서 collector로 전송되는 plain text 형태의 로그 확인이 가능합니다. )
분석 코드 적용이 완료되고, 스토어 배포시에는 해당 필드를 false로 변경하여 배포하는 것을 권장합니다.

http통신을 허용하기 위해 NSAppTransportSecurity 를 아래와 같이 추가합니다

```xml
<key>NSAppTransportSecurity</key>
<dict>
	<key>NSAllowsArbitraryLoads</key>
	<true/>
</dict>
```

## 2. 기본 분석 적용 ( required )

### 2.1 SDK initialization

XCode 프로젝트의 AppDelegate 가 정의된 클래스의 **didFinishLaunchingWithOptions ** 함수에 SDK를 Initialization하기 위한 코드를 다음과 같이 적용합니다

```objectivec
#import <DOT/DOT.h>
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	[DOT initialization:launchOptions application:application];
}
```

DOT가 사용되는 곳에서는 **#import <_DOT/DOT.h_>**을 통해 import가 필요합니다.
이하 적용 예시에서는 가독성을 위해 import하는 부분이 생략되어 있습니다.

### 2.2 방문 및 페이지 분석

앱의 실행 및 페이지 분석을 위해서는 각 화면의 이동시에 호출되는 Callback 함수에 다음과 같은 코드의 적용이 필요합니다
아래의 2가지 코드를 적용후에는 기본적으로 분석되는 범위는 대략적으로 다음과 같습니다

- 앱 실행 및 방문수, 일/주/월순수방문수 등 방문과 관련된 지표
- 페이지뷰, 페이지 체류시간
- 통신사, 단말기, 국가 등 방문자의 단말기 환경으로 부터 추출될 수 있는 지표

XCode 프로젝트의 각 View 화면별 **viewWillAppear()** 함수와 **viewWillDisappear()** 함수에 다음과 같이 기본 적인 페이지 트래픽 분석을 위한 코드를 적용합니다

```objectivec
- (void)viewWillAppear:(BOOL)animated {
	[super viewWillAppear:animated];
	[DOT onStartPage];
}

- (void)viewWillDiasppear:(BOOL)animated {
	[super viewWillDisappear:animated];
	[DOT onStopPage];
}
```

## 3. Hybrid 앱 분석 방법 ( required in Hybrid App )

Hybrid 앱의 경우 앱 내에서 WebView 를 사용하여 웹 컨텐츠를 서비스 하기도 합니다
이와 같이 Webview 에 의해서 보여지는 웹 컨텐츠의 경우에는
위에서 설명된 Native 화면과는 다른 방식으로 동작하기 때문에, 별도의 분석 코드 적용이 필요합니다
분석 대상 앱이 만약 Hybrid 앱인 경우에는 아래의 코드를 참고하여 웹 컨텐츠도 분석할 수 있도록 적용을 해야합니다

앱내에서 사용할 WebView 의 Delegate 함수에 아래와 같이 분석코드를 적용합니다

### 3.1 UIWebView를 사용할 경우 적용할 분석코드

```objectivec
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    [DOT setWebView:webView reqeust:request];
    return YES;

}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
    [DOT setJavascriptInjectionInWebView:webView];
}

```

### 3.2 WKWebView를 사용할 경우 적용할 분석코드

```objectivec
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    NSURLRequest *request = navigationAction.request;
    decisionHandler(WKNavigationActionPolicyAllow);

    [DOT setWkWebView:webView reqeust:request];
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    [DOT setJavascriptInjectionInWkWebView:webView];
}
```

## 4. 유입경로 분석 ( optional )

### 4.1 앱 설치 경로 분석

앱이 설치된 경로를 분석하는 시점은, 앱이 설치후 처음 실행될때 설치 경로를 획득하게 됩니다
이에 대한 처리는 기본적으로 위에서 설명된 **SDK 필수 적용 사항**이 적용된 상태에서는 자동으로 처리가 되기 때문에, 별도의 분석코드 적용이 필요하지 않습니다
다만, 앱의 특별한 상황에 의해서 앱에서 수신된 설치 경로 정보를 SDK에 직접 설정하고자 하는 경우에는 다음의 코드를 사용하세요

AppDelegate 정의 항목중 **didFinishLaunchingWithOptions** 함수 정의에서 파라미터로 전달받은 launchOptions 로 부터 설치 경로를 직접 획득후,
수신된 값을 **setInstallReferrer()** 함수를 사용해서 SDK로 전달할 수 있습니다
다만, 주의할 사항은 아래와 같이 직접 앱 설치 경로를 SDK에 설정하는 경우,
해당 코드가 매 실행 시점마다 반복해서 실행되지 않고 앱 설치후 최초 1회만 동작하도록 적용되어야 합니다
또한, 아래의 코드는 반드시 **SDK initialization() 함수 호출 이후** 에 적용되어야 합니다

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	NSURL *referrer = [launchOptions valueForKey:UIApplicationLaunchOptionsURLKey];
	if (referrer){
		[DOT setInstallReferrer:referrer];
	}
}
```

### 4.2 외부 유입 경로 분석 ( Deeplink )

앱이 설치된 이후 DeepLink를 통해서 앱이 실행되는 경로 분석이 필요한 경우 아래와 같이 **setDeepLink()** 함수를 사용하면 분석이 가능합니다

```objectivec
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
	[DOT setDeepLink:[url absoluteString]];
	return YES;
}
```

### 4.3 Facebook 분석

Facebook 앱에서 유입되는 설치수를 분석하기 위해서는 Facebook에서 제공하는 SDK가 분석 대상 앱에 설치가 선행되어야 합니다

#### 4.3.1 FBSDK 다운로드 방법

##### 1) XCode 프로젝트 파일중 Podfile 파일에 다음과 같이 SDK를 추가합니다

```bat
pod 'FacebookSDK'
```

##### 2) Podfile 에 dependency 를 추가한 뒤에는 Terminal 프로그램을 실행하여 다음의 명령을 수행합니다

```bat
cmd> pod install
```

만약 Cocoapad 환경의 프로젝트가 아닌 경우에는, 아래의 링크에서 다운로드가 가능합니다
다운로드한 Framework 파일을 XCode 프로젝트에서 참조 가능하도록 설정 하시기 바랍니다

[FBSDK iOS 다운로드 하기](https://developers.facebook.com/docs/ios/downloads)

#### 4.3.2 FBSDK 설치 방법

##### 1) info.plist 파일을 **source로 보기** 로 오픈합니다
##### 2) 이름 속성 아래에 포함된 내용중 **&#91;APP\\\_ID&#93;** 와 **&#91;APP\\\_NAME&#93;** 부분을 Facebook Developer Site 에서 제공하는 값으로 치환후 info.plist 파일에 저장합니다

```xml
<key>CFBundleURLTypes</key>
<array>
	<dict>
		<key>CFBundleURLSchemes</key>
		<array>
			<string>fb[APP_ID]</string>
		</array>
	</dict>
</array>
<key>FacebookAppID</key>
<string>[APP_ID]</string>
<key>FacebookDisplayName</key>
<string>[APP_NAME]</string>
```

#### 4.3.3 FBSDK 로부터 Install Referrer를 수신하고, SDK에 전달하는 방법

사용자가 Facebook에 노출된 광고를 클릭하고 앱을 설치한 경우 설치된 앱에서는 FBSDK를 통해서 AppLinkData를 수신받을 수 있습니다
아래의 코드에서 FBSDK로부터 AppLinkData를 수신 받고, 수신 받은 AppLinkData 를 SDK로 전달하는 방법을 확인할 수 있습니다
이 함수는 MainActivity 의 onCreate() 함수에 적용하세요

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	[FBSDKAppLinkUtility fetchDeferredAppLink:^(NSURL *url, NSError *error) {
		if(error) {
			NSLog(@"Received error while fetching deferred app link %@", error);
		}
		if(url) {
			[DOT setFacebookreferrerData:url];
		}
	}];
}
```

Facebook SDK와 관련하여 보다 자세한 설치 방법은 아래의 링크에서 확인이 가능합니다
[FBSDK iOS 적용방법 자세히 보기](https://developers.facebook.com/docs/ios/)

### 4.4 푸시 메시지 분석

푸시 메시지와 관련되어 push token값을 수집하고,
수신된 메시지를 클릭하여 앱이 실행된 오픈수 분석등을 적용하는 방법에 대해서 설명합니다

#### 4.4.1 push token 분석 방법

push token은 푸시 발송 시스템에서 메시지 전송시 수신 대상이 되는 개개인 별로 Unique하게 발급되는 일종의 식별ID 값입니다.
push token을 분석하기 위해서 AppDelegate 에 정의된 **didRegisterForRemoteNotificationsWithDeviceToken()** 함수에
아래와 같이 분석 코드를 적용합니다

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
	NSString *strDeviceToken = [deviceToken description];
	NSCharacterSet *characterSet = [NSCharacterSet characterSetWithCharactersInString:@"< >"];
	NSString *strWithoutSpace = [[strDeviceToken stringByTrimmingCharactersInSet:characterSet] stringByReplacingOccurrencesOfString:@" " withString:@""];
	[DOT setPushToken:strWithoutSpace];
}
```

#### 4.4.2 수신된 푸시 메시지를 클릭하여 앱이 실행된 오픈수 분석 방법

각 단말기에 수신된 푸시 메시지를 사용자가 클릭한 경우에 대해서 분석합니다
푸시 메시지를 클릭하고, 실행되는 로직에서 아래의 분석 코드를 적용합니다

```objectivec
[DOT setPushClick:userInfo];
```

### 4.5 Universal Link 분석

#### 4.5.1 Univarsal Link 사용을 위해 Associated Domains에 WiseTracker 서비스 도메인 등록(아래 이미지 참조)
  - applinks:cdn.wisetracker.co.kr
  - applinks:ads.wisetracker.co.kr

![](http://www.wisetracker.co.kr/wp-content/uploads/2019/12/associatedDomains-1024x583.png)

#### 4.5.2 위 두 도메인의 서버에 apple-app-site-association에 적용할 앱의 번들 ID와 팀 ID를 당사에 전달

![](http://www.wisetracker.co.kr/wp-content/uploads/2019/12/team-ID-%E1%84%92%E1%85%AA%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB-1024x605.png)

#### 4.5.3 appDelegate 아래 함수 적용
  : continueUserActivity 부분에 아래와 같이 적용이 되어야 유니버셜링크를 통한 광고분석이 가능합니다.

```objectivec
  
```

## 5. 고급 컨텐츠 분석 ( optional )

in-App 에서 발생하는 다양한 이벤트를 분석하기 위해서는 분석 대상 앱에서 해당 이벤트가 발생된 시점에,
SDK에게 해당 정보를 전달해야 합니다
이어지는 내용에서는 주요 이벤트들의 분석 방법에 대해서 자세하게 설명합니다

### 5.1 로그인 분석

#### 5.1.1 로그인 이벤트 분석

분석 대상 앱에 로그인 기능이 있는 경우에, 로그인 이벤트에 대한 발생 여부를 분석할 수 있습니다
로그인 처리 완료후, 로그인 완료 페이지에 아래와 같이 분석 코드를 적용합니다

```objectivec
- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

	[DOT onStartPage];
	[DOT setPage:
		[Page builder:^(Page *page) {
			[page setPageIdentity:@"LIR"];
		}]
	];
}
```

만약에 위와 같이 로그인 완료 페이지가 따로 존재하지 않고, 곧 바로 MainActity 또는 컨텐츠 페이지로 이동하는 경우가 있을 수 있습니다
이 경우에는 로그인을 처리하는 Backend 로직을 수행후, 아래와 같이 로그인 완료 이벤트를 전송할 수 있습니다

```objectivec
... 로그인 처리 로직 수행 ...
[DOT onStartPage];
[DOT setPage:
	[Page builder:^(Page *page) {
		[page setIdentity:@"LIR"];
	}]
];
```

#### 5.1.2 회원 분석

로그인 완료 이벤트 분석시, 현재 로그인한 사용자의 다양한 정보를 분석할 수 있습니다
로그인 완료에 대한 처리 완료후, 아래와 같이 분석 코드를 적용합니다

```objectivec
[DOT setUser:
	[User builder:^(User *user) {
		[user setGender:@"M"];
		[user setAge:@"A"];
		[user setAttr1:@"attr1"];
	}]
];
```

회원 분석과 관련되어 제공되는 분석 항목은 다음과 같습니다

| Class 이름 |      Method 이름      |                   파라미터                   |
| :--------: | :-------------------: | :------------------------------------------: |
|    User    |  setMember(isMember)  |        회원여부를 나타내는 Y,N값 전달        |
|    User    | setMemberGrade(grade) |       회원등급을 나타내는 코드값 전달        |
|    User    |  setMemberId(userId)  |         회원의 로그인 아이디를 전달          |
|    User    |   setGender(gender)   | 회원 성별을 나타내는 M,F,U 중 한가지 값 전달 |
|    User    |      setAge(age)      |       회원 연령을 나타내는 코드값 전달       |
|    User    |    setAttr1(attr)     |       회원 속성#1 의미하는 코드값 전달       |
|    User    |    setAttr2(attr)     |       회원 속성#2 의미하는 코드값 전달       |
|    User    |    setAttr3(attr)     |       회원 속성#3 의미하는 코드값 전달       |
|    User    |    setAttr4(attr)     |       회원 속성#4 의미하는 코드값 전달       |
|    User    |    setAttr5(attr)     |       회원 속성#5 의미하는 코드값 전달       |

#### 5.2 Page 분석

[분석 가능 Page Key](./key/page) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 5.2.1 Page Identiy 분석

앱에 존재하는 각 페이지를 의미하는 Identity를 사용자가 정의하고, 각 화면들에 정의된 Identity를 적용하면,
앱에서 가장 사용 빈도가 높은 화면별 랭킹을 알 수 있습니다
Identity값은 **AlphaNumeric 형태를 가지는 최대길이 8자 미만의 코드값** 이어야 합니다

```objectivec
- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

    NSMutableDictionary *screen = [[NSMutableDictionary alloc] init];
    [screen setValue:@"Your Page Identity Value" forKey:@"pi"];

    [DOT logScreen:screen];
}
```

#### 5.2.2 상품 페이지 분석

e-commerce 앱의 경우 상품 상세 페이지에 분석코드를 적용하여, 상품별 조회수를 분석합니다
상품 상세 페이지에 아래와 같이 분석 코드를 적용하세요

```java
- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

    NSMutableDictionary *screen = [[NSMutableDictionary alloc] init];
    [screen setValue:@"PDV" forKey:@"pi"];
    [screen setValue:@"상품카테고리" forKey:@"pg1"];
    [screen setValue:@"상품코드" forKey:@"pnc"];
    [screen setValue:@"상품속성#1" forKey:@"pnAttr1"];

    [DOT logScreen:screen];
}
```

#### 5.2.3 Contents Path 분석

앱에 존재하는 각 페이지에 Hierarchical 한 Contents Path값을 적용하면,
각 컨텐츠의 사용 비율을 카테고리별로 그룹화 하여 분석이 가능합니다
Contents Path는 **'^'** 문자를 구분자로 하고, Contents Path의 시작은 **^ 문자로 시작** 되어야 합니다
또한 Contents Path로 전달되는 값에는 **'** 와 **"** 기호는 사용할 수 없습니다

```objectivec
- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

    NSMutableDictionary *screen = [[NSMutableDictionary alloc] init];
    [screen setValue:@"^메인^계정정보 수정" forKey:@"cp"];

    [DOT logScreen:screen];
}
```

#### 5.2.4 Multi Variables 분석( 사용자 정의 변수 )

Multi Variables 분석 항목은 사용자가 그 항목에 전달할 값을 정의하여 사용이 가능합니다.
비즈니스에서 필요한 분석 항목을 SDK API 함수로 전달하고, 그렇게 전달된 값을 기준으로 페이지뷰수, 방문수등을 측정하고 보여줍니다
Multi Variables 의 분석값은 값에는 **'** 와 **"** 기호는 사용할 수 없습니다 ( 영어,숫자,한글만 사용 가능 )

```objectivec
- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

    NSMutableDictionary *screen = [[NSMutableDictionary alloc] init];
    [screen setValue:@"Multi Variables 값1" forKey:@"mvt1"];
    [screen setValue:@"Multi Variables 값2" forKey:@"mvt2"];
    [screen setValue:@"Multi Variables 값3" forKey:@"mvt3"];
    [screen setValue:@"Multi Variables 값4" forKey:@"mvt4"];

    [DOT logScreen:screen];
}
```

#### 5.2.5 내부 검색어 분석

앱에 검색기능이 있는 경우 사용자가 입력한 검색어와 검색한 카테고리, 검색 결과수등을 분석하면
검색 기능의 활용성을 측정할 수 있습니다
검색 결과가 보여지는 화면에 다음과 같이 분석 코드를 적용합니다.

```objectivec
- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];

	// 사용자가 통합 검색 카테고리에서 청바지 검색어로 1200개의 검색 결과를 보았을떄 적용 예시
	NSMutableDictionary *screen = [[NSMutableDictionary alloc] init];
    [screen setValue:@"청바지" forKey:@"skwd"];
    [screen setValue:@"통합검색" forKey:@"scart"];
    [screen setValue:[NSNumber numberWithInt:1200] forKey:@"sresult"];

    [DOT logScreen:screen];
}
```

### 5.3 Click 분석

[분석 가능 Click Key](./key/click) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 5.3.1 검색 결과 클릭 분석

검색 결과 페이지에서 보여지는 많은 검색 결과 항목별 클릭수를 분석합니다
이 분석 결과를 통해서 검색 결과의 상단에 노출되는 항목들이 적절한지 가늠할 수 있습니다
검색 결과 페이지에서 특정 항목이 클릭되면, 해당 화면으로 이동하기 이전에 아래와 같이 분석 코드를 적용하세요

```objectivec
	NSMutableDictionary *click = [[NSMutableDictionary alloc] init];
    [click setValue:@"SCH" forKey:@"ckTp"];
    [click setValue:@"클릭된 검색 결과 항목 ID" forKey:@"ckData"];

    [DOT logClick:click];
];
``` 

#### 5.3.2 장바구니 담긴 상품 분석

e-commerce 관련된 비즈니스의 경우 장바구니에 담긴 상품을 분석할 수 있습니다.
장바구니 담기 이벤트 발생시 아래와 같은 코드를 적용하세요.


```objectivec
	NSMutableDictionary *click = [[NSMutableDictionary alloc] init];
    [click setValue:@"SCRT" forKey:@"ckTp"];
    [click setValue:@"상품카테고리(대)" forKey:@"pg1"];
    [click setValue:@"상품코드" forKey:@"pnc"];
    [click setValue:@"상품속성#1" forKey:@"pnAtr1"];

    [DOT logClick:click];
``` 
 
#### 5.3.3 클릭 이벤트 분석

앱에 존재하는 다양한 클릭 요소 ( 배너, 버튼 등 ) 에 대해서, 클릭수를 분석합니다.
각 요소가 클릭되는 시점에 아래와 클릭된 요소의 목적지 화면으로 이동하기 이전에 아래와 같은 분석 코드를 적용하세요.


```objectivec
[	NSMutableDictionary *click = [[NSMutableDictionary alloc] init];
    [click setValue:@"CKC" forKey:@"ckTp"];
    [click setValue:@"클릭된 검색 결과 항목 ID" forKey:@"ckData"];

    [DOT logClick:click];
```  

클릭된 요소의 ID값으로 단일 문자열로된 값을 전달하기도 하지만
앞에서 설명한 **Contents Path 분석** 과 같이, Hierarchical 한 Path값을 전달하여 추후 데이터 조회시 Categorizing 하게 보기도 가능합니다
Hierarchical 한 Path 값을 사용하고자 할때 값에 대한 제약사항은 **Contents Path 분석** 과 동일합니다.
 
#### 5.3.4 클릭 이벤트 고급 분석( Multi Variables )

클릭 이벤트 분석시 앞에서 설명한 **Multi Variables 분석** 을 같이 적용하면, **Multi Variables 분석 항목별 클릭수** 를 측정할 수 있습니다
클릭 이벤트가 발생된 시점에 다음과 같이 Multi Variables 값을 같이 SDK에 전달하도록 분석코드를 적용하세요

```objectivec
// 클릭 이벤트 분석시 Multi Variables 분석값을 같이 전송하는 예시
	NSMutableDictionary *click = [[NSMutableDictionary alloc] init];
    [click setValue:@"CKC" forKey:@"ckTp"];
    [click setValue:@"클릭된 검색 결과 항목 ID" forKey:@"ckData"];
    [click setValue:@"click mvt 1" forKey:@"mvt1"];
    [click setValue:@"click mvt 2" forKey:@"mvt2"];
    [click setValue:@"click mvt 3" forKey:@"mvt3"];
    [click setValue:@"click mvt 4" forKey:@"mvt4"];
    [click setValue:@"click mvt 5" forKey:@"mvt5"];

    [DOT logClick:click];
```  

### 5.4 Conversion 분석

앱내에 존재하는 Conversion중 가장 대표적인게 **구매 전환** 을 생각할 수 있습니다
하지만, 앱내에는 앱이 제공하는 서비스에 따라서 매우 다양한 Conversion이 존재할 수 있습니다
또한, 이미 정의된 Conversion 일지라도 서비스의 변화, 시대의 변화애 따라서 새로 정의되어야 하기도 하고, 사용하지 않아서 폐기되기도 합니다

SDK는 총 80개의 Conversion 을 사용자가 정의하고, 분석 코드를 적용함으로써 앱으로 인하여 발생하는 Conversion 측정이 가능합니다
이는 **구매 전환과는 독립적으로 분석되며, 사용자는 언제든지 분석 코드의 적용 기준을 새로 정의**할 수 있습니다

[분석 가능 Conversion Key](./key/goal) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 5.4.1 Conversion 분석

```objectivec
	// Micro Conversion #1 번의 사용 예시
    NSMutableDictionary *event = [[NSMutableDictionary alloc] init];
    [event setValue:@"goal1" forKey:@"g1"];

    [DOT logEvent:event];
```

#### 5.4.2 Conversion 고급 분석( 상품 )

Conversion은 단순하게 발생 횟수를 측정할 수도 있으나,
상품과 연계하여 상품별로 정의한 Conversion의 발생 횟수 측정도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Conversion Data + Product Data 를 SDK로 전달하세요

```objectivec
    NSMutableDictionary *event = [[NSMutableDictionary alloc] init];
    [event setValue:@"goal1" forKey:@"g1"];

    NSMutableDictionary *product = [[NSMutableDictionary alloc] init];
    [product setValue:@"상품카테고리(대)" forKey:@"pg1"];
    [product setValue:@"상품코드" forKey:@"pnc"];
    [product setValue:@"상품속성#1" forKey:@"pnAtr1"];

    [event setValue:product forKey:@"product"];

    [DOT logEvent:event];
```

#### 5.4.3 Conversion 고급 분석( Multi Variables )

Multi Variables 항목과 연계하여 Conversion의 발생 횟수 측정도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Conversion Data + Multi Variables Data 를 SDK로 전달하세요

```objectivec
   NSMutableDictionary *event = [[NSMutableDictionary alloc] init];

   [event setValue:@"goal1" forKey:@"g1"];
   [event setValue:@"goal mvt1" forKey:@"mvt1"];
   [event setValue:@"goal mvt2" forKey:@"mvt2"];
   [event setValue:@"goal mvt3" forKey:@"mvt3"];
   [event setValue:@"goal mvt4" forKey:@"mvt4"];
   [event setValue:@"goal mvt5" forKey:@"mvt5"];

   [DOT logEvent:event];
```

### 5.5 Purchase 분석

앱내에서 발생하는 구매 이벤트를 분석합니다
구매 완료 페이지에서 아래와 같이 구매와 관련된 정보를 SDK에 전달하세요

[분석 가능 Purchase Key](./key/purchase) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다.분석을 희망하는 key 값을 확인후 적용해 주세요.  

#### 5.5.1 단일 상품 구매 분석

```objectivec
    NSMutableDictionary *purchase = [[NSMutableDictionary alloc] init];
    [purchase setValue:@"your Order Number" forKey:@"ordNo"];
    [purchase setValue:@"KRW" forKey:@"curcy"];

    NSMutableDictionary *product1 = [[NSMutableDictionary alloc] init];
    [product1 setValue:@"상품카테고리(대)" forKey:@"pg1"];
    [product1 setValue:@"상품코드1" forKey:@"pnc"];
    [product1 setValue:@"상품속성#1" forKey:@"pnAtr1"];
    [product1 setValue:[NSNumber numberWithInt:10000] forKey:@"amt"];
    [product1 setValue:[NSNumber numberWithInt:1] forKey:@"ea"];

    NSMutableArray *productArray = [[NSMutableArray alloc] init];
    [productArray addObject:product1];

    [purchase setValue:productArray forKey:@"product"];

    [DOT logPurchase:purchase];
```

#### 5.5.2 복수 상품 구매 분석

```objectivec
    NSMutableDictionary *purchase = [[NSMutableDictionary alloc] init];
    [purchase setValue:@"your Order Number" forKey:@"ordNo"];
    [purchase setValue:@"KRW" forKey:@"curcy"];

    NSMutableDictionary *product1 = [[NSMutableDictionary alloc] init];
    [product1 setValue:@"상품카테고리(대)" forKey:@"pg1"];
    [product1 setValue:@"상품코드1" forKey:@"pnc"];
    [product1 setValue:@"상품속성#1" forKey:@"pnAtr1"];
    [product1 setValue:[NSNumber numberWithInt:10000] forKey:@"amt"];
    [product1 setValue:[NSNumber numberWithInt:1] forKey:@"ea"];

    NSMutableDictionary *product2 = [[NSMutableDictionary alloc] init];
    [product2 setValue:@"상품카테고리(대)" forKey:@"pg1"];
    [product2 setValue:@"상품코드1" forKey:@"pnc"];
    [product2 setValue:@"상품속성#1" forKey:@"pnAtr1"];
    [product2 setValue:[NSNumber numberWithInt:10000] forKey:@"amt"];
    [product2 setValue:[NSNumber numberWithInt:1] forKey:@"ea"];

    NSMutableArray *productArray = [[NSMutableArray alloc] init];
    [productArray addObject:product1];
    [productArray addObject:product2];

    [purchase setValue:productArray forKey:@"product"];

    [DOT logPurchase:purchase];
```

#### 5.4.3 구매 고급 분석( Multi Variables )

Multi Variables 항목과 연계하여 Purchase 분석도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Purchase Data + Multi Variables Data 를 SDK로 전달하세요

```objectivec
    NSMutableDictionary *purchase = [[NSMutableDictionary alloc] init];
    [purchase setValue:@"your Order Number" forKey:@"ordNo"];
    [purchase setValue:@"KRW" forKey:@"curcy"];

    NSMutableDictionary *product1 = [[NSMutableDictionary alloc] init];
    [product1 setValue:@"상품카테고리(대)" forKey:@"pg1"];
    [product1 setValue:@"상품코드1" forKey:@"pnc"];
    [product1 setValue:@"상품속성#1" forKey:@"pnAtr1"];
    [product1 setValue:[NSNumber numberWithInt:10000] forKey:@"amt"];
    [product1 setValue:[NSNumber numberWithInt:1] forKey:@"ea"];

    NSMutableArray *productArray = [[NSMutableArray alloc] init];
    [productArray addObject:product1];

    [purchase setValue:productArray forKey:@"product"];
    [purchase setValue:@"purchase mvt 1" forKey:@"mvt1"];
    [purchase setValue:@"purchase mvt 2" forKey:@"mvt2"];
    [purchase setValue:@"purchase mvt 3" forKey:@"mvt3"];
    [purchase setValue:@"purchase mvt 4" forKey:@"mvt4"];
    [purchase setValue:@"purchase mvt 5" forKey:@"mvt5"];

    [DOT logPurchase:purchase];
```
