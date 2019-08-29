Danh mục viết tắt: animation= anim
# animation_RN
React Native cung cấp 2 hệ thống API animation: 
  1. Animated : kiểm soát animation chi tiết và tương tác của các giá trị cụ thể của các Component
  2. Layout Animation: điều khiển animation qua sự thay đổi toàn cục của layout.

[1] Animated API

[1.1]Tính chất:
  - Focuses on declarative relationship between I/O: sự chuyển dịch từ đầu vào đến đầu ra. Ex: opacity: 0 ==> 1
  - Configurable: cấu hình được. Ex : duration(thời gian diễn ra anim), delay(độ trễ của anim),...
  - Use 2 method start() and stop() to control time-base.
[1.2] Các loại:
  - Animated cung cấp 6 loại anim: View,Text, Image , Scrollview, Flatlist, SectionList.
  - Ngoài ra có thể dùng Animated.createAnimatedComponent() để tạo ra Anim Component mong muốn.
[1.3] Configuring animations: cấu hình animations:
Có 3 loại configure anim phổ biến:

***[1.3.1]Animated.timing():

1. Định nghĩa: Map time range to easing value.
2. Cú pháp: 
    Animated.timing(
      animatedValue,{
        toValue: number,//giá trị đầu ra 
        duration: number,//thời gian của anim    
        easing:easingFunction,//hàm easing biểu diễn quá trình của anim
        delay: number//độ trễ của anim
        }
   )
@easingFuction: convey physically believable motion. 

1 số hàm predfine: 
  - back: lùi lại trước khi thực hiện,
  - bounce: nảy,
  - ease: quán tính,
  - elastic: đàn hồi,
tham khảo thêm: https://facebook.github.io/react-native/docs/easing
                https://easings.net/

***[1.3.2]Animated.spring():

1.Định nghĩa:Tracks velocity state to create fluid motions as the toValue updates and can be chained together.
2.Cú pháp:
  Animated.spring(
    animatedValue,
    {                       // chú ý friction,tesion đi 1 cặp, speed,bouciness đi 1 cặp
      toValue: number,      // 4 tham số đáng chú ý nhất.
      friction: number,     // điều khiển độ ma sát của anim
      tension: number,      // điều khiển tốc độ thực hiện của anim
      speed: number,        // điều khiển tốc độ của anim
      bouciness: number     // điều khiển độ đàn hồi của anim
    }
  )
***[1.3.3]Animated.decay(): 

1.Định nghĩa: Animates a value from an initial velocity to zero based on a decay coefficient. // từ 1 giá trị vận tốc khởi tạo giảm tới 0 dựa theo hệ số gia giảm.
2.Cú pháp:
  Animated.decay(
    animatedValue,
    {
      velocity: number,   //vận tốc khởi tạo
      deceleration: number, // hệ số giảm tốc
     }
   )
   
[1.4] Composing animations
có 4 cách thường gặp:

-Animated.delay(time): bắt đầu anim sau 1 khoảng thời gian
-Animated.sequence([anims]): bắt đầu các anim theo thứ tự, đợi anim trước xong mới tiếp tục
-Animated.parallel([anims]): bắt đầu các anim cùng 1 lúc
-Animated.stagger(time,[anims]): bắt đầu các anim theo thứ tự nhưng có khoảng thời gian delay giữa các anim


[1.5] Combining animated values
** khởi tạo 1 giá trị Animated: 
  -new Animated.Value(number) biểu thị cho 1 điểm
  -new Animated.Value(number) biểu thị cho 1 vector
** dựa trên các gíá trị đã khởi tạo có thể tạo ra các giá trị mới dựa vào:
-Animated.add()
-Animated.subtract()
-Animated.divide()
-Animated.modulo()
-Animated.multiply()
