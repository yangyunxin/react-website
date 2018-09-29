/*
SQLyog Ultimate v11.22 (64 bit)
MySQL - 5.7.22 : Database - cloth_mall
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cloth_mall` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `cloth_mall`;
/*Table structure for table `t_user_admin` */

DROP TABLE IF EXISTS `t_user_admin`;

CREATE TABLE `t_user_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(45) NOT NULL COMMENT '用户名',
  `password` varchar(128) NOT NULL COMMENT '密码，MD5加密',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '用户类型：0-内部用户',
  `mobile` varchar(45) DEFAULT NULL COMMENT '手机号',
  `email` varchar(45) DEFAULT NULL COMMENT '邮箱',
  `url` varchar(120) DEFAULT NULL COMMENT '头像',
  `status` tinyint(1) NOT NULL COMMENT '状态：0-不可用，1-可用',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `editer` varchar(64) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

/*Table structure for table `t_user_account` */

DROP TABLE IF EXISTS `t_user_account`;

CREATE TABLE `t_user_account` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `password` varchar(70) DEFAULT NULL COMMENT '密码，MD5加密',
  `phone_number` varchar(20) DEFAULT '' COMMENT '手机号码，登录时用手机号码+密码登录',
  `name` varchar(20) DEFAULT NULL COMMENT '昵称',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `url` varchar(200) DEFAULT NULL COMMENT '头像',
  `regist_channel` varchar(32) DEFAULT NULL COMMENT '用户来源：0-公众号,1-小程序,2-App,3-网站',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `latest_login_time` datetime DEFAULT NULL COMMENT '最近登录时间',
  `status` varchar(2) DEFAULT NULL COMMENT '状态：0正常 1封号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

/*Table structure for table `t_user_account_receive_address` */

DROP TABLE IF EXISTS `t_user_account_receive_address`;

CREATE TABLE `t_user_account_receive_address` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account_id` bigint(32) DEFAULT NULL COMMENT '地址对应用户ID',
  `consignee_name` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '收货人姓名',
  `phone_number` varchar(20) COLLATE utf8mb4_bin NOT NULL COMMENT '手机号码',
  `province` bigint(32) DEFAULT NULL COMMENT '省',
  `province_name` varchar(100) COLLATE utf8mb4_bin DEFAULT '' COMMENT '省份名称',
  `city` bigint(32) DEFAULT NULL COMMENT '市',
  `city_name` varchar(100) COLLATE utf8mb4_bin DEFAULT '' COMMENT '城市名称',
  `district` bigint(32) NOT NULL COMMENT '县/区',
  `district_name` varchar(100) COLLATE utf8mb4_bin DEFAULT '' COMMENT '县/区',
  `address` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '详细地址',
  `full_address` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '全地址',
  `is_defult` varchar(5) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '是否默认地址，0-默认地址,1-非默认地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '修改时间',
  `is_deleted` smallint(2) DEFAULT '0' COMMENT '标识是否删除:0-未删除，1-删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户收货地址表';

/*Table structure for table `t_dictionary` */

DROP TABLE IF EXISTS `t_dictionary`;

CREATE TABLE `t_dictionary` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(30) NOT NULL COMMENT '类型',
  `code` varchar(50) NOT NULL COMMENT '字典编码',
  `value` varchar(11) NOT NULL COMMENT '值',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `parentcode` varchar(50) NOT NULL COMMENT '父编码',
  `gradation` int(3) DEFAULT NULL COMMENT '顺序',
  `level` int(3) DEFAULT NULL COMMENT '层级',
  `remark` varchar(150) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  `editer` varchar(64) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据字典表';

/*Table structure for table `t_account_log` */

DROP TABLE IF EXISTS `t_account_log`;

CREATE TABLE `t_account_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) unsigned DEFAULT NULL COMMENT '用户Id',
  `event_type` varchar(20) DEFAULT NULL COMMENT '事件类型:0-登录，1-Logout',
  `app` varchar(30) DEFAULT NULL COMMENT '应用',
  `login_IP_Address` varchar(100) DEFAULT NULL COMMENT '登录IP地址',
  `location` varchar(100) DEFAULT NULL COMMENT '事件发生位置',
  `timestamp` datetime DEFAULT NULL COMMENT '时间戳',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户日志';

/*Table structure for table `t_product` */

DROP TABLE IF EXISTS `t_product`;

CREATE TABLE `t_product` (
  `id` bigint(32) NOT NULL COMMENT '产品编号',
  `same_style_num` varchar(32) NOT NULL COMMENT '产品货号',/*用户自定义，最后两位同款颜色序号，其余为款式编号*/
  ‘product_inventory’ int comment '库存量',
  `factory_num` varchar(32) DEFAULT NULL COMMENT '工厂代码',
  `name` varchar(75) NOT NULL COMMENT '产品名称',
  `main_picture` varchar(120) DEFAULT NULL COMMENT '主图',
  `detail_picture` text COMMENT '详情图，最多不超过五张',
  `detail` varchar(5000) DEFAULT NULL COMMENT '商品详情',
  `colour` varchar(260) DEFAULT NULL COMMENT '商品颜色',
  `product_category` varchar(50) DEFAULT NULL COMMENT '产品大类', /*有什么*/
  `product_subcategory` varchar(50) DEFAULT NULL COMMENT '产品子类',/*有什么*/
  `status` varchar(30) DEFAULT NULL COMMENT '产品状态：0-待上架，1-上架，2-下架',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  `editer` varchar(64) DEFAULT NULL COMMENT '编辑者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品表';

/*Table structure for table `t_product_price` */

DROP TABLE IF EXISTS `t_product_price`;

CREATE TABLE `t_product_price` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_id` bigint(32) NOT NULL COMMENT '产品ID',
  `interval` varchar(50) DEFAULT NULL COMMENT '区间',
  `unit` varchar(20) DEFAULT NULL COMMENT '单位',
  `price` float(10,2) DEFAULT NULL COMMENT '价格',
  `original_price` float(10,2) DEFAULT NULL COMMENT '划线价',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  `editer` varchar(64) DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品价格表';

/*Table structure for table `t_oauth_client` */

/*Table structure for table `t_agent` */

DROP TABLE IF EXISTS `t_agent`;

CREATE TABLE `t_agent` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account_id` bigint(32) NOT NULL COMMENT '用户ID',
  `type` varchar(20) NOT NULL COMMENT '代理商类型,0-门店代理商，1-个人代理商',
  `di_per` double DEFAULT NULL COMMENT '分成提点',
  `name` varchar(30) DEFAULT NULL COMMENT '代理商名称',
  `url` varchar(120) DEFAULT NULL COMMENT '代理商门店图片地址',
  `detail` text COMMENT '门店详情',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  `editer` varchar(64) DEFAULT NULL COMMENT '修改者',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='代理商表';

/*Table structure for table `t_agent_product` */

DROP TABLE IF EXISTS `t_agent_product`;

CREATE TABLE `t_agent_product` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `agent_id` bigint(32) DEFAULT NULL COMMENT '代理商ID',
  `product_id` bigint(32) DEFAULT NULL COMMENT '产品ID',
  `sign` varchar(30) DEFAULT NULL COMMENT '加密后的码值',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='代理商产品关联表';

/*Table structure for table `t_shop_car` */

DROP TABLE IF EXISTS `t_shop_car`;

CREATE TABLE `t_shop_car` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_id` bigint(32) NOT NULL COMMENT '产品ID',
  `account_id` bigint(32) NOT NULL COMMENT '用户ID',
  `amount` float DEFAULT NULL COMMENT '数量',
  `unit` varchar(20) DEFAULT NULL COMMENT '单位',
  `agent_id` bigint(32) DEFAULT NULL COMMENT '代理商ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车';

/*Table structure for table `t_oauth_client` */

DROP TABLE IF EXISTS `t_oauth_client`;

CREATE TABLE `t_oauth_client` (
  `client_id` varchar(128) NOT NULL,
  `secret` varchar(128) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `grant_types` varchar(125) DEFAULT NULL,
  `refresh_token_validity_seconds` int(11) DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `client_id_UNIQUE` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `t_oauth_refresh_token` */

DROP TABLE IF EXISTS `t_oauth_refresh_token`;

CREATE TABLE `t_oauth_refresh_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `account_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` varchar(45) DEFAULT NULL,
  `refresh_token` varchar(45) DEFAULT NULL,
  `expires_in` datetime DEFAULT NULL,
  `authentication` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `t_order` */

DROP TABLE IF EXISTS `t_order`;

CREATE TABLE `t_order` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `account_id` bigint(32) DEFAULT NULL COMMENT '用户ID',
  `type` varchar(64) DEFAULT 'Normal' COMMENT '订单类型：Normal 正常',
  `status` varchar(32) DEFAULT NULL COMMENT '订单状态：WaitForPay 0-待支付，WaitForDeliver 1-待发货，Shipped 2-已发货，Finished 3-已完成，Cancled 4-已取消',
  `delivery_address` varchar(1024) DEFAULT NULL COMMENT '收货地址、 json 格式',
  `express_company_name` varchar(75) DEFAULT NULL COMMENT '快递公司',
  `express_tracking_no` varchar(64) DEFAULT NULL COMMENT '快递单号',
  `payment_method` varchar(32) DEFAULT NULL COMMENT '支付方式：0-在线支付, 1-货到付款，2-公司转账',
  `payment_channel` varchar(32) DEFAULT NULL COMMENT '支付渠道：0-微信Wechat, 1-支付宝,Alipay,2-银联',
  `payment_no` varchar(32) DEFAULT NULL COMMENT '订单支付单号：第三方支付流水号',
  `payment_status` varchar(32) DEFAULT NULL COMMENT '支付状态：0-支付成功,1-支付失败',
  `order_amount_payable` float(10,2) DEFAULT null COMMENT '订单应付金额',
  `order_amount_payment` float(10,2) DEFAULT NULL COMMENT '订单实付金额',
  `rebate_total` float(10,2) DEFAULT NULL COMMENT '返点金额',
  `rebate_status` varchar(2) DEFAULT NULL COMMENT '是否返点，0-是，1-否',
  `agent_id` bigint(32) DEFAULT NULL COMMENT '代理商ID',
  `note` varchar(512) DEFAULT NULL COMMENT '买家留言',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `delivery_method` varchar(32) DEFAULT NULL COMMENT '配送方式：0-快递配送, 1-上门自提',
  `shipping_time` datetime DEFAULT NULL COMMENT '发货时间',
  `received_time` datetime DEFAULT NULL COMMENT '收货时间',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单主表';

/*Table structure for table `t_order_product` */

DROP TABLE IF EXISTS `t_order_product`;

CREATE TABLE `t_order_product` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(32) DEFAULT NULL COMMENT '订单ID',
  `product_id` bigint(32) DEFAULT NULL COMMENT '产品ID',
  `quantity` float(10,3) DEFAULT NULL COMMENT '数量',
  `unit` varchar(20) DEFAULT NULL COMMENT '单位',
  `price` double(10,2) DEFAULT NULL COMMENT '价格',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单产品关联表';

/*Table structure for table `t_sky_light` */

DROP TABLE IF EXISTS `t_sky_light`;

CREATE TABLE `t_sky_light` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sky_id` varchar(50) NOT NULL COMMENT '天窗ID',
  `sky_type` varchar(15) NOT NULL COMMENT '天窗类型：Banner',
  `sky_content` text COMMENT '天窗内容',
  `sky_title` varchar(25) DEFAULT NULL COMMENT '天窗标题',
  `description` varchar(120) DEFAULT NULL COMMENT '描述',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `editer` varchar(64) DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='天窗（轮播图）';

/*Table structure for table `t_topic` */

DROP TABLE IF EXISTS `t_topic`;

CREATE TABLE `t_topic` (
  `id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(120) DEFAULT NULL COMMENT '标题',
  `description` varchar(300) DEFAULT NULL COMMENT '描述',
  `sort` bigint(20) DEFAULT '0' COMMENT '顺序',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `status` varchar(10) DEFAULT NULL COMMENT '状态',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `creator` varchar(64) DEFAULT NULL COMMENT '创建者',
  `editer` varchar(64) DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='主题表';

/*Table structure for table `t_topic_product` */

DROP TABLE IF EXISTS `t_topic_product`;

CREATE TABLE `t_topic_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `topic_id` bigint(20) DEFAULT NULL COMMENT 'topicID',
  `product_id` bigint(20) DEFAULT NULL COMMENT '产品ID',
  `sort` bigint(20) DEFAULT NULL COMMENT '产品顺序',
  `status` varchar(10) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='主题产品关联表';


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
