package com.LoginRegister.request;

public class LoginRequest {

    public LoginRequest() {

    }
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginRequest(Integer userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    private Integer userId;
    private String password;
}
