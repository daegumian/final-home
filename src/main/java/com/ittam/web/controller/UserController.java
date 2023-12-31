package com.ittam.web.controller;

import com.ittam.web.command.UserVO;
import com.ittam.web.user.service.UserService;
import com.ittam.web.utill.MailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@Controller
//@RequestMapping("/login")
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    // 사용자 목록
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/UserList")
    public ResponseEntity<ArrayList<UserVO>> userList(){
        ArrayList<UserVO> list = userService.userList();
        return ResponseEntity.ok(list);
    }
    
    // 사용자 등록
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/UserRegist")
    public ResponseEntity<Integer> userRegist(@RequestBody UserVO userVO){

        int data = userService.userRegist(userVO);

        System.out.println("data = " + data);

        if(data == 1){
            return new ResponseEntity<>(data, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/passwordFind")
    public ResponseEntity<ArrayList<UserVO >> PasswordFind(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            ArrayList<UserVO> vo = userService.passwordFind(requestBody.get("emailInput"));

            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserVO>());
        }

    }

    @PostMapping("/authSend")
    public ResponseEntity<Integer> authSend(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.get("emailInput"));
        MailSend send = new MailSend();
        send.setAuthNum((int)(Math.random() * 899999) + 100000);
        String result = send.welcomeMailSend(requestBody.get("emailInput"), send.getAuthNum());
        System.out.println(result);
        return ResponseEntity.ok(send.getAuthNum());
    }

    @PostMapping("/passwordModify")
    public ResponseEntity<String> passwordModify(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            userService.UserPasswordReset(requestBody.get("passwordReset"), requestBody.get("emailInput"));
            return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("비밀번호 변경 중 오류가 발생했습니다.");
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Map<String, String> request) {
//        System.out.println(request.toString());
//
//
//        try {
//            return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("비밀번호 변경 중 오류가 발생했습니다.");
//        }
//
//
//    }

}
