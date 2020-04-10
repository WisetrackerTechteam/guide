# React Native 가이드

## 1. 리액트 플러그인 설치 (AOS/IOS 공통 설정)

### 1.1 플러그인 다운로드
-> 터미널에서 아래의 명령어를 통해 리액트 플러그인을 프로젝트에 다운로드 합니다.

```shell
$ npm install --save git+https://github.com/WisetrackerTechteam/RW-react-package.git
```

### 1.2 플러그인 설치 확인

프로젝트에 플러그인이 정상 다운로드되면 node_modules 폴더 아래 다음과 같이 플러그인 파일이 추가된 것을 확인할 수 있습니다.

<img src="http://www.wisetracker.co.kr/wp-content/uploads/2020/03/rw_RN_folder.png" />

## 2. Android 설정

### 2.1 Http 통신 허용 설정

프로젝트의 **Target API 28** 이상일 경우 Http 통신 허용 추가

```xml

<!-- AndroidManifest.xml -->
<application
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:networkSecurityConfig="@xml/network_security_config"
    android:theme="@style/AppTheme">
```

```xml

<!-- app/res/xml/network_security_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">collector.naver.wisetracker.co.kr</domain>
        <domain includeSubdomains="true">report.wisetracker.co.kr</domain>
    </domain-config>
</network-security-config>
```

### 2.2 AuthorizationKey 설정

strings.xml 파일에 제공받은 App Analytics Key 정보를 추가

```xml
<!-- /Assets/Plugins/Android/res/values/strings.xml -->
<string-array name="dotAuthorizationKey">
    <item name="usdMode">1</item>                                           // (1) DOT/DOX (2) DOT
    <item name="domain">http://collector.naver.wisetracker.co.kr</item>     // DOT END POINT
    <item name="domain_x">http://collector.naver.wisetracker.co.kr</item>   // DOX END POINT
    <item name="serviceNumber">103</item>
    <item name="expireDate">14</item>
    <item name="isDebug">false</item>
    <item name="isInstallRetention">true</item>
    <item name="isFingerPrint">true</item>
    <item name="accessToken">access_token_string</item>
</string-array>
```

### 2.3 딥링크 설정

AndroidManifest.xml 파일에 딥링크로 진입할 **android:scheme="YOUR_SCHEME"** 스키마와 **android:host="YOUR_HOST"** 호스트를 설정해 주세요.  
(**딥링크를 통해서 앱이 실행되는 경로 분석이 필요한 경우에 적용**)
              
```xml
<!-- /Assets/Plugins/Android/AndroidManifest.xml --> 
<!--  예시는 wisetracker://wisetracker.co.kr 링크로 진입시 딥링크 분석이 가능 -->
<activity android:name="kr.co.wisetracker.tracker.DeepLinkActivity" 
          android:launchMode="singleTop" >
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- 딥링크로 진입될 스키마와 호스트 정보 입력 -->
        <data android:host="wisetracker.co.kr"
              android:scheme="wisetracker" />
    </intent-filter>
</activity>
```

## 3. iOS 설정

### 3.1 Framework & Bridge 파일 세팅

#### 3.1.1 node_modules - DotReactNativeBridge - ios 경로에 4개의 Framework파일과 2개의 소스파일을 Xcode 프로젝트 최상단 폴더에 Drag & Drop 방식으로 가져다 놓습니다. 

![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/file_path-1024x511.png)

#### 3.1.2 위 작업 중 반드시 Copy items if needed 옵션을 체크합니다.

![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/drag_drop_option.png)

#### 3.1.3 작업 완료 후 Xcode 프로젝트 폴더에 아래와 같이 설치 되었음을 확인할 수 있습니다.

<img src="http://www.wisetracker.co.kr/wp-content/uploads/2020/03/xcode_file_path.png" width="350" />


#### 3.1.4 Targets - General - Frameworks, Libraries, and Embedded Content 메뉴로 이동하여 Embed 옵션을 Embed Without Signing로 세팅합니다. 

![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/framework_option.png)

### 3.2 info.plist 값 세팅

XCode 프로젝트의 info.plist 파일에 제공받은 App Analytics Key 정보를 추가합니다
info.plist 파일을 open할때 **list로 보기** 가 아니라 **source로 보기**를 선탁하신뒤, 제공받으신 Key를 **Ctrl+V** 하시면 됩니다
제공받은 Key값은 아래의 예시와 같이 xml 형태를 가지고 있는 데이터 입니다

```xml
<key>dotAuthorizationKey</key>
<dict>
    <key>accessToken</key>
    <string></string>
    <key>domain</key>
    <string>http://stg-app-wcs.naver.com</string>
    <key>expireDate</key>
    <string>14</string>
    <key>isDebug</key>
    <string>true</string>
    <key>isFingerPrint</key>
    <string>true</string>
    <key>isInstallRetention</key>
    <string>true</string>
    <key>serviceNumber</key>
    <string>102</string>
    <key>useMode</key>
    <integer>1</integer>
</dict>
```

위의 Key 중에 isDebug는 collector 로 전송되는 분석 데이터를 Xcode 에서 확인할 수 있게 해주는 boolean 변수로 사용되고 있습니다
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

## 4. 플러그인 초기화
리액트 프로젝트에서 앱 시작시 최초 로드되는 .js 파일에 아래 코드를 추가합니다.

```javascript
import DotReactBridge from 'DotReactNativeBridge/wrapper/react/DotReactBridge.js';
import Dop from 'DotReactNativeBridge/dop-native-sdk-inf.js'
```

## 5. 기본분석

앱의 실행 및 페이지 분석을 위해서는 각 화면의 이동시에 호출되는 Callback 함수에 다음과 같은 코드의 적용이 필요합니다
아래의 2가지 코드를 적용후에는 기본적으로 분석되는 범위는 대략적으로 다음과 같습니다

- 앱 실행 및 방문수, 일/주/월순수방문수 등 방문과 관련된 지표
- 페이지뷰, 페이지 체류시간
- 통신사, 단말기, 국가 등 방문자의 단말기 환경으로 부터 추출될 수 있는 지표

Javascpirt의 화면 로딩이 완료되는 시점에 다음과 같이 기본적인 페이지 트래픽 분석을 위한 코드를 적용합니다.

```javascript
    DOT.startPage();
```

## 6. 고급 컨텐츠 분석 ( optional )

in-App 에서 발생하는 다양한 이벤트를 분석하기 위해서는 분석 대상 앱에서 해당 이벤트가 발생된 시점에,
SDK에게 해당 정보를 전달해야 합니다
이어지는 내용에서는 주요 이벤트들의 분석 방법에 대해서 자세하게 설명합니다

### 6.1 로그인 분석

#### 6.1.1 로그인 이벤트 분석

분석 대상 앱에 로그인 기능이 있는 경우에, 로그인 이벤트에 대한 발생 여부를 분석할 수 있습니다
로그인 처리 완료후, 로그인 완료 페이지에 아래와 같이 분석 코드를 적용합니다

```javascript
  let screen = {}; 
  screen["pi"] = "LIR"; 
  DOT.logScreen(screen);
```

#### 3.1.2 회원 분석

로그인 완료 이벤트 분석시, 현재 로그인한 사용자의 다양한 정보를 분석할 수 있습니다
로그인 완료에 대한 처리 완료후, 아래와 같이 분석 코드를 적용합니다

```javascript
  DOT.setUser(User.setGender("M")
                  .setAttr1("user Attr1")
                  .setAge("A"));
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

### 6.2 Page 분석

[분석 가능 Page Key](./key/page) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 6.2.1 Page Identity 분석

앱에 존재하는 각 페이지를 의미하는 Identity를 사용자가 정의하고, 각 화면들에 정의된 Identity를 적용하면,
앱에서 가장 사용 빈도가 높은 화면별 랭킹을 알 수 있습니다
Identity값은 **AlphaNumeric 형태를 가지는 최대길이 8자 미만의 코드값** 이어야 합니다

```javascript
  let screen = {}; 
  screen["pi"] = "Your Page Identity Value";
  DOT.logScreen(screen);
```

#### 6.2.2 상품 페이지 분석

e-commerce 앱의 경우 상품 상세 페이지에 분석코드를 적용하여, 상품별 조회수를 분석합니다.
상품 상세 페이지에 아래와 같이 분석 코드를 적용하세요.

```javascript
  let screen = {}; 
  screen["pi"] = "PDV"; 
  screen["pg1"] = "상품카테고리(대)"; 
  screen["pnc"] = "상품코드"; 
  screen["pnAtr1"] ="상품속성#1" 
  DOT.logScreen(screen);
```

#### 6.2.3 Contents Path 분석

앱에 존재하는 각 페이지에 Hierarchical 한 Contents Path값을 적용하면,
각 컨텐츠의 사용 비율을 카테고리별로 그룹화 하여 분석이 가능합니다
Contents Path는 **'^'** 문자를 구분자로 하고, Contents Path의 시작은 **^ 문자로 시작** 되어야 합니다
또한 Contents Path로 전달되는 값에는 **'** 와 **"** 기호는 사용할 수 없습니다

```javascript
  let screen = {}; 
  screen["cp"] = "^메인^계정정보 수정";
  DOT.logScreen(screen);
```

#### 6.2.4 Multi letiables 분석( 사용자 정의 변수 )

Multi letiables 분석 항목은 사용자가 그 항목에 전달할 값을 정의하여 사용이 가능합니다.
비즈니스에서 필요한 분석 항목을 SDK API 함수로 전달하고, 그렇게 전달된 값을 기준으로 페이지뷰수, 방문수등을 측정하고 보여줍니다
Multi letiables 의 분석값은 값에는 **'** 와 **"** 기호는 사용할 수 없습니다 ( 영어,숫자,한글만 사용 가능 )

```javascript
  let screen = {}; 
  screen["mvt1"] = "page mvt 1"; 
  screen["mvt2"] = "page mvt 2"; 
  screen["mvt3"] = "page mvt 3"; 
  screen["mvt4"] = "page mvt 4";
  screen["mvt5"] = "page mvt 5"; 
  DOT.logScreen(screen);
```

#### 6.2.5 내부 검색어 분석

앱에 검색기능이 있는 경우, 사용자가 입력한 검색어와 검색한 카테고리, 검색 결과수등을 분석하면
검색 기능의 활용성을 측정할 수 있습니다
검색 결과가 보여지는 화면에 다음과 같이 분석 코드를 적용합니다

```javascript
  // 사용자가 통합 검색 카테고리에서 청바지 검색어로 1200개의 검색 결과를 보았을떄 적용 예시 
  let screen = {}; 
  screen["skwd"] = "청바지";
  screen["scart"] = "통합검색"; 
  screen["sresult"] = 1200; 
  
  DOT.logScreen(screen);
```

### 6.3 Click 분석

[분석 가능 Click Key](./key/click) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 6.3.1 검색 결과 클릭 분석

검색 결과 페이지에서 보여지는 많은 검색 결과 항목별 클릭수를 분석합니다.
이 분석 결과를 통해서 검색 결과의 상단에 노출되는 항목들이 적절한지 가늠할 수 있습니다.
검색 결과 페이지에서 특정 항목이 클릭되면, 해당 화면으로 이동하기 이전에 아래와 같이 분석 코드를 적용하세요.

```javascript
  let click = {}; 
  click["ckTp"] = "SCH"; 
  click["ckData"] = "클릭된 검색 결과 항목 ID"; 
  DOT.logClick(click);
```

#### 6.3.2 장바구니 담긴 상품 분석

e-commerce 관련된 비즈니스의 경우 장바구니에 담긴 상품을 분석할 수 있습니다
장바구니 담기 이벤트 발생시 아래와 같은 코드를 적용하세요

```javascript
  let click = {}; 
  click["ckTp"] = "SCRT"; 
  click["pg1"] = "상품카테고리(대)"; 
  click["pnc"] = "상품코드"; 
  click["pnAtr1"] = "상품속성#1";
  DOT.logClick(click);
```

#### 6.3.3 클릭 이벤트 분석

앱에 존재하는 다양한 클릭 요소 ( 배너, 버튼 등 ) 에 대해서, 클릭수를 분석합니다
각 요소가 클릭되는 시점에 아래와 클릭된 요소의 목적지 화면으로 이동하기 이전에 아래와 같은 분석 코드를 적용하세요

```javascript
  let click = {}; 
  click["ckTp"] = "CKC"; 
  click["ckData"] = "클릭된 검색 결과 항목 ID"; 
  DOT.logClick(click);
```

클릭된 요소의 ID값으로 단일 문자열로된 값을 전달하기도 하지만,
앞에서 설명한 **Contents Path 분석** 과 같이, Hierarchical 한 Path값을 전달하여 추후 데이터 조회시 Categorizing 하게 보기도 가능합니다
Hierarchical 한 Path 값을 사용하고자 할때 값에 대한 제약사항은 **Contents Path 분석** 과 동일합니다

#### 6.3.4 클릭 이벤트 고급 분석( Multi letiables )

클릭 이벤트 분석시 앞에서 설명한 **Multi letiables 분석** 을 같이 적용하면, **Multi letiables 분석 항목별 클릭수** 를 측정할 수 있습니다
클릭 이벤트가 발생된 시점에 다음과 같이 Multi letiables 값을 같이 SDK에 전달하도록 분석코드를 적용하세요

```javascript
  // 클릭 이벤트 분석시 Multi letiables 분석값을 같이 전송하는 예시 
  let click = {}; 
  click["ckTp"] = "CKC"; 
  click["ckData"] = "클릭된 검색 결과 항목 ID"; 
  click["mvt1"] = "page mvt 1";
  click["mvt2"] = "page mvt 2";
  click["mvt3"] = "page mvt 3"; 
  click["mvt4"] = "page mvt 4"; 
  click["mvt5"] = "page mvt 5";
  
  DOT.logClick(click);
```

### 6.4 Conversion 분석

앱내에 존재하는 Conversion중 가장 대표적인게 **구매 전환** 을 생각할 수 있습니다.
하지만, 앱내에는 앱이 제공하는 서비스에 따라서 매우 다양한 Conversion이 존재할 수 있습니다.
또한, 이미 정의된 Conversion 일지라도, 서비스의 변화, 시대의 변화애 따라서 새로 정의되어야 하기도 하고, 사용하지 않아서 폐기되기도 합니다.

SDK는 총 80개의 Conversion 을 사용자가 정의하고, 분석 코드를 적용함으로써 앱으로 인하여 발생하는 Conversion 측정이 가능합니다.
이는 \**구매 전환*과는 독립적으로 분석되며, 사용자는 언제든지 분석 코드의 적용 기준을 새로 정의할 수 있습니다.

[분석 가능 Conversion Key](./key/goal) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 6.4.1 Conversion 분석

```javascript
  // Micro Conversion #1 번의 사용 예시 
  let event = {}; 
  event["g1"] = "goal 1"; 
  DOT.logEvent(event)
```

#### 6.4.2 Conversion 고급 분석( 상품 )

Conversion은 단순하게 발생 횟수를 측정할 수도 있으나,
상품과 연계하여 상품별로 정의한 Conversion의 발생 횟수 측정도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Conversion Data + Product Data를 SDK로 전달하세요.

```javascript

  let event = {}; 
  event["g1"] = "goal 1"; 
  
  let product : [String: Any] = [:]; 
  product["pg1"] = "상품카테고리(대)"; 
  product["pnc"] = "상품코드";
  product["pnAtr1"] = "상품속성#1";
  event["product"] = product;
  DOT.logEvent(event);

```

#### 6.4.3 Conversion 고급 분석( Multi letiables )

Multi letiables 항목과 연계하여 Conversion의 발생 횟수 측정도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Conversion Data + Multi letiables Data 를 SDK로 전달하세요

```javascript
  let event = {}; 
  event["g1"] = "goal 1" ;
  event["mvt1"] = "mvt1 1";
  DOT.logEvent(event);
```

### 6.5 Purchase 분석

앱내에서 발생하는 구매 이벤트를 분석합니다
구매 완료 페이지에서 아래와 같이 구매와 관련된 정보를 SDK에 전달하세요

[분석 가능 Purchase Key](./key/purchase) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다.분석을 희망하는 key 값을 확인후 적용해 주세요. 

#### 6.5.1 Purchase 분석

```javascript
  let purchase = {}; 
  purchase["ordNo"] = "your Order Number";
  purchase["curcy"] = "KRW";
  
  let product1 = {}; 
  product1["pg1"] = "상품카테고리(대)"; 
  product1["pnc"] = "상품코드1"; 
  product1["pnAtr1"] = "상품속성#1"; 

  let product2 = {}; 
  product2["pg1"] = "상품카테고리(대)";
  product2["pnc"] = "상품코드2"; 
  product2["pnAtr1"] = "상품속성#2"; 
  let productArray = []; 
  productArray.push(product1);
  productArray.push(product2); 
  purchase["product"] = productArray;
  DOT.logPurchase(purchase);
```

#### 6.5.2 Purchase 고급 분석( Multi letiables )

Multi letiables 항목과 연계하여 Purchase 분석도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Purchase Data + Multi letiables Data 를 SDK로 전달하세요

```javascript
  let purchase = {}; 
  purchase["ordNo"] = "your Order Number";
  purchase["curcy"] = "KRW";
  
  let product1 = {};
  product1["pg1"] = "상품카테고리(대)";
  product1["pnc"] = "상품코드1";
  product1["pnAtr1"] = "상품속성#1";
  
  let productArray = []; 
  productArray.push(product1)
  purchase["product"] = productArray;
  purchase["mvt1"] = "mvt 1";
  purchase["mvt2"] = "mvt 2"; 
  purchase["mvt3"] = "mvt 3"; 
  purchase["mvt4"] = "mvt 4";
  purchase["mvt5"] = "mvt 5";
  DOT.logPurchase(purchase)
```

