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

## 3. iOS 리액트 플러그인 설정

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

## 5. 인앱 분석

Javascrip 가이드 내 2. 기분 분석, 3. 고급 컨텐츠 분석 ( optional )을 참조하시기 바랍니다.
