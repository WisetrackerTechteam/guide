
## 1. Cocos2d-x 플러그인 설치 (AOS/IOS 공통 설정)

### 1.1 Cocos2d-x 패키지 패키지 다운로드

Cocos2d-x 플러그인 패키지를 다운로드 해주세요.
[패키지 다운로드](https://github.com/WisetrackerTechteam/RW-cocos-package)

## 2. Android 설정

### 2.1 SDK 설치

#### 2.1.1 wisetracker-cocos.jar 삽입

다운로드 받은 패키지 폴더의 `proj.android/libs/wisetracker-cocos.jar` 파일을 안드로이드 스튜디오 `Project/app/libs` 폴더에에 삽입해 주세요.

#### 2.1.2 Classes 파일 삽입

Cocos2dx 프로젝트의 Classes 폴더에 다운로드 받은 패키지의 Classes 폴더에 들어있는 파일(`Dop.cpp`, `Dop.h`)을 복사해 주세요.

#### 2.1.3 Classes 파일 설정

Cocos2dx 프로젝트의 `CMakeLists.txt` 파일에 `소스파일`과 `헤더파일`을 선언해 주세요.

```
list(APPEND GAME_SOURCE
     Classes/Dop.cpp // 추가
     )
list(APPEND GAME_HEADER
     Classes/Dop.h   // 추가
     )
```

#### 2.1.4 SDK Download

Android 프로젝트 `app/build.gradle` 파일 `dependencies` 블록에 의존성을 추가해 주세요.

```gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar']) 
    ....
    implementation 'com.sdk.wisetracker.base:base_module_test:0.0.77'
    implementation 'com.sdk.wisetracker.new_dot:new_dot_module_test:0.0.77'
}
```

### 2.2 SDK 설정

#### 2.2.1 AuthorizationKey 등록

Android 프로젝트 `app/res/values/strings.xml` 파일에 제공받은 `App Analytics Key` 정보를 추가해 주세요.

```xml
<string-array name="dotAuthorizationKey">
    <item name="usdMode">2</item>
    <item name="domain">http://collector.naver.wisetracker.co.kr</item>
    <item name="serviceNumber">103</item>
    <item name="expireDate">14</item>
    <item name="isDebug">false</item>
    <item name="isInstallRetention">true</item>
    <item name="isFingerPrint">true</item>
    <item name="accessToken">access_token_string</item>
</string-array>
```

#### 2.2.2 Http 통신 허용 설정

프로젝트의 `Target API 28 이상`일 경우 Http 통신 허용을 추가해 주세요.

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

### 2.2.3 딥링크 설정

`AndroidManifest.xml` 파일에서 앱의 환경에 맞춰 `android:host`, `android:scheme` 값을 변경해 주세요.

```xml
<!--  예시는 wisetracker://wisetracker.co.kr 링크로 진입시 딥링크 분석이 가능 -->
<activity android:name="com.sdk.wisetracker.cocos.DeepLinkActivity" 
          android:launchMode="singleTop" >
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- 딥링크로 진입될 스키마와 호스트 정보 수정 -->
        <data android:host="wisetracker.co.kr"
              android:scheme="wisetracker" />
    </intent-filter>
</activity>
```

## 3. iOS 설정
### 3.1 CouchbaseLite.framework, GameController.framework, MediaPlayer.framework 추가
제공한 CouchbaseLite.framework파일을 **Targets - General - Frameworkd, Libraries, and embedded Content** 메뉴에 
**Embed & Sign**옵션으로 추가합니다. 

기본 제공되는 GameController.framework, MediaPlayer.framework 도 추가해줍니다.

![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/cocos2d_frameworks.png)

### 3.2 Other Linker Flag -ObjC 옵션 추가

**Tagets -  Build Settings - Other Linker Flags**에 **-ObjC** 옵션을 추가합니다.
![] (http://www.wisetracker.co.kr/wp-content/uploads/2020/03/cocos2d_otherlinker.png)

### 3.3 info.plist 세팅
XCode 프로젝트의 info.plist 파일에 제공받은 App Analytics Key 정보를 추가합니다
info.plist 파일을 open할때 **list로 보기** 가 아니라 **source로 보기**를 선탁하신뒤, 제공받으신 Key를 **Ctrl+V** 하시면 됩니다
제공받은 Key값은 아래의 예시와 같이 xml 형태를 가지고 있는 데이터 입니다

```xml
<key>dotAuthorizationKey</key>
<dict>
	<key>domain</key>
	<string>http://stg-app-wcs.naver.com</string>
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

## 4. 기본 설정

### 4.1 헤더 파일 추가

SDK를 사용하는 .cpp 파일에서 `Dop.h` 파일을 `include` 해주세요.

```c
#include "Dop.h"
```

### 4.2 초기화

앱 시작시 `초기화` 코드 삽입

```c
DOTBridge::initialization();
```

### 4.3 체류 시간 분석

체류시간 분석 페이지 `진입`과 `이탈`시 각각 아래와 같이 코드를 삽입해 주세요.  

```c#
// 체류 시간 분석을 위한 시간(분 단위)을 넣어주세요
// 예) 15분 단위로 체류 페이지 자동 전송
DOTBridge::onPlayStart(15);
```

```c#
DOTBridge::onPlayStop();
```

## 5. 고급 컨텐츠 분석

`in-App` 에서 발생하는 다양한 이벤트를 분석하기 위해서는 분석 대상 앱에서 해당 이벤트가 발생되는 시점에 SDK로 해당 정보를 전달해야 합니다.  
이어지는 내용에서는 주요 이벤트들의 분석 방법에 대해서 자세하게 설명합니다.

### 5.1 회원 분석

`사용자 정보 분석`을 합니다.

```c
UserBridge user;
user.SetGender("M");
user.SetAge("30");
user.SetAttr1("attr1");
user.SetMember("member");
user.SetMemberGrade("VIP");
DOTBridge::setUser(user.GetJson());
```

**User.Class**

| Class 이름  |      Method 이름       |                   파라미터                   |
| --------   | -------------------   | ------------------------------------------ |
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

### 5.2 Page 분석

[분석 가능 Page Key](./key/page.md). `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

### 5.2.1 Page Identiy 분석 

앱에 존재하는 각 페이지가 의미하는 `Identity`를 각 화면들에 적용하면 앱에서 가장 사용 빈도가 높은 화면별 랭킹을 알 수 있습니다.

```c
Json::Value page;
page["pi"] = "Your Page Identity Value";
Json::StreamWriterBuilder builder;
std::string pageJson = Json::writeString(builder, page);
DOTBridge::onStartPage();
DOTBridge::logScreen(pageJson);
```

### 5.2.2 상품 페이지 분석 

`e-commerce` 앱의 경우 상품 상세 페이지에 분석코드를 적용하여 상품별 조회수를 분석합니다.

```c
Json::Value page;
Json::Value product;
Json::Value productArray;
product["orderNo"]  = "ORD001";
product["currency"]  = "KRW";
product["pg1"]  = "sports";
product["pg2"]  = "fashion";
product["pg3"]  = "cloth";
product["pnc"]  = "PNC001";
product["ordPno"]  = "BESTABC";
product["amt"]  = "100,000";
product["ea"]  = "1";
product["mvt1"]  = "mvt1";
productArray.append(product);
page["pi"] = "PRODUCT_PAGE";
page["products"] = productArray;
Json::StreamWriterBuilder builder;
std::string pageJson = Json::writeString(builder, page);
DOTBridge::onStartPage();
DOTBridge::logScreen(pageJson);
```

### 5.2.3 Contents Path 분석 

앱의 각 페이지에 `Hierarchical` 한 `Contents Path`를 적용하면 각 컨텐츠의 사용 비율을 카테고리별로 그룹화 하여 분석이 가능합니다.

```c
Json::Value page;
// Contents Path는 '^' 문자로 시작, '^' 문자를 구분자로 합니다.
// Contents Path로 전달되는 값에는 ' 와 " 기호는 사용할 수 없습니다.
page["cp"] =  "^path^path";
Json::StreamWriterBuilder builder;
std::string pageJson = Json::writeString(builder, page);
DOTBridge::onStartPage();
DOTBridge::logScreen(pageJson);
```

### 5.2.4 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```c
Json::Value page;
page["mvt1"] = "page mvt 1";
page["mvt2"] = "page mvt 2";
page["mvt3"] = "page mvt 3";
page["mvt4"] = "page mvt 4";
page["mvt5"] = "page mvt 5";
Json::StreamWriterBuilder builder;
std::string pageJson = Json::writeString(builder, page);
DOTBridge::onStartPage();
DOTBridge::logScreen(pageJson);
```

### 5.2.5 내부 검색어 분석 

앱에 검색기능이 있는 경우 사용자가 입력한 `검색어`와, 검색한 `카테고리`, `검색 결과수` 등을 분석하면 검색 기능의 활용성을 측정할 수 있습니다.  
검색 결과가 보여지는 화면에 분석 코드를 적용합니다.

```c
// 사용자가 '통합 검색' 카테고리에서 '청바지' 검색어로 '1200개의 검색 결과를 보았을떄 적용 예시 
Json::Value page;
page["skwd"] = "청바지";
page["scart"] = "통합검색";
page["sresult"] = "1200";
Json::StreamWriterBuilder builder;
std::string pageJson = Json::writeString(builder, page);
DOTBridge::onStartPage();
DOTBridge::logScreen(pageJson);
```

### 5.3 Click 분석
[분석 가능 Click Key](../SDK/key/click) `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

### 5.3.1 검색 결과 클릭 분석. 

검색 결과 페이지에서 보여지는 많은 검색 결과 항목별 `클릭수`를 분석합니다.  
이 분석 결과를 통해서 검색 결과의 상단에 노출되는 항목들이 적절한지 가늠할 수 있습니다.  
검색 결과 페이지에서 특정 항목이 클릭되면, 해당 화면으로 이동하기 이전에 아래와 같이 분석 코드를 적용하세요.  

```c
Json::Value click;
click["ckTp"] = "SCH";
Json::StreamWriterBuilder builder;
std::string clickJson = Json::writeString(builder, click);
DOTBridge::logClick(clickJson);
```

### 5.3.2 장바구니 담긴 상품 분석 

`e-commerce` 관련된 비즈니스의 경우 장바구니에 담긴 상품을 분석할 수 있습니다.

```c
Json::Value click;
click["ckTp"] = "SCRT";
Json::Value product;
product["pg1"] = "상품카테고리(대)";
product["pnc"] = "상품코드";
product["pnAtr1"] = "상품속성#1";
click["product"] = product;
Json::StreamWriterBuilder builder;
std::string clickJson = Json::writeString(builder, click);
DOTBridge::logClick(clickJson);
```

### 5.3.3 클릭 이벤트 분석 

앱에 존재하는 다양한 클릭 요소(`배너`, `버튼` 등)에 대해서 `클릭수`를 분석합니다. 각 요소가 클릭되는 시점에 아래와 같은 분석 코드를 적용해 주세요.

```c
Json::Value click;
click["ckTp"] = "CKC";
Json::StreamWriterBuilder builder;
std::string clickJson = Json::writeString(builder, click);
DOTBridge::logClick(clickJson);
```

**클릭된 요소의 ID값으로 단일 문자열로된 값을 전달하기도 하지만, 앞에서 설명한 Contents Path 분석과 같이 Hierarchical 한 Path값을 전달하여 추후 데이터 조회시 Categorizing 하게 보기도 가능합니다. Hierarchical 한 Path 값을 사용하고자 할때 값에 대한 제약사항은. Contents Path 분석과 동일합니다.**

### 5.3.4 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```c
// 클릭 이벤트 분석시 Multi Variables 분석값을 같이 전송하는 예시
Json::Value click;
click["mvt1"] = "click mvt 1";
click["mvt2"] = "click mvt 2";
click["mvt3"] = "click mvt 3";
click["mvt4"] = "click mvt 4";
click["mvt5"] = "click mvt 5";
Json::StreamWriterBuilder builder;
std::string clickJson = Json::writeString(builder, click);
DOTBridge::logClick(clickJson);
```

### 5.4 Conversion 분석

가장 대표적으로 구매 전환을 생각할 수 있지만, 앱내에는 앱이 제공하는 서비스에 따라서 매우 다양한 Conversion이 존재할 수 있습니다.  
또한, 이미 정의된 Conversion 일지라도, 서비스의 변화, 시대의 변화애 따라서 새로 정의되어야 하기도 하며, 사용하지 않아서 폐기되기도 합니다.  
SDK는 총 `80개`의 `Conversion`을 사용자가 정의하고, 분석 코드를 적용함으로써 앱으로 인하여 발생하는 Conversion 측정이 가능합니다.  
이는, **구매 전환과는 독립적으로 분석되며, 사용자는 언제든지 분석 코드의 적용 기준을 새로 정의** 할 수 있습니다.  

[분석 가능 Conversion Key](../SDK/key/goal) `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

```c
// Conversion 1번의 사용 예시
Json::Value event;
event["g1"] = "goal 1";
Json::StreamWriterBuilder builder;
std::string eventJson = Json::writeString(builder, event);
DOTBridge::logEvent(eventJson);
```

### 5.4.1 Conversion 상품 분석 

단순하게 Conversion 발생 횟수를 측정할 수도 있으나, 상품과 연계하여 `상품별`로 정의한 Conversion 발생 횟수 측정이 가능합니다. 

```c
Json::Value event;
Json::Value product;
product["pg1"] = "상품카테고리(대)";
product["pnc"] = "상품코드";
product["pnAtr1"] = "상품속성#1";
event["product"] = product;
Json::StreamWriterBuilder builder;
std::string eventJson = Json::writeString(builder, event);
DOTBridge::logEvent(eventJson);
```

### 5.4.2 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```c
Json::Value event;
event["mvt1"] = "conversion mvt 1";
event["mvt2"] = "conversion mvt 2";
event["mvt3"] = "conversion mvt 3";
event["mvt4"] = "conversion mvt 4";
event["mvt5"] = "conversion mvt 5";
Json::StreamWriterBuilder builder;
std::string eventJson = Json::writeString(builder, event);
DOTBridge::logEvent(eventJson);
```

### 5.5 Purchase 분석

[분석 가능 Purchase Key](../SDK/key/purchase) `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.
앱내에서 발생하는 `구매 이벤트`를 분석합니다. 구매 완료 페이지에서 아래와 같이 구매와 관련된 정보를 SDK에 전달해 주세요.

#### 5.5.1 Purchase 제품 분석

```c#
Json::Value purchase;
Json::Value product;
Json::Value productArray;
product["pg1"] = "상품카테고리(대)";
product["pnc"] = "상품코드";
product["pnAtr1"] = "상품속성#1";
product["ea"] = "1";
productArray.append(product);
purchase["products"] = productArray;
Json::StreamWriterBuilder builder;
std::string purchaseJson = Json::writeString(builder, purchase);
DOTBridge::logPurchase(purchaseJson);
```

#### 5.5.2 Purchase 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```c#
Json::Value purchase;
purchase["mvt1"] = "purchase mvt 1";
purchase["mvt2"] = "purchase mvt 2";
purchase["mvt3"] = "purchase mvt 3";
purchase["mvt4"] = "purchase mvt 4";
purchase["mvt5"] = "purchase mvt 5";
Json::StreamWriterBuilder builder;
std::string purchaseJson = Json::writeString(builder, purchase);
DOTBridge::logPurchase(purchaseJson);
```
