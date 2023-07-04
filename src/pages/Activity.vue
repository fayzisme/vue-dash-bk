<template>
	<div class="page-profile scrollable only-y" id="affix-container" v-loading="loadingActivity">
		<div v-if="!showAlertError" class="card-base card-shadow--medium identity" id="boundary">
			<div class="cover"></div>
			<!-- <div class="username" v-affix="{parentid: 'affix-container', boundaryid: '', delay:600, offset:0, enable:() => affixEnabled}"></div> -->
			<div class="username">
				<div class="cover-small"></div>
				<div class="avatar-small"><img src="@/assets/images/user_default.png" alt="avatar"></div>
				<span>User Activity History</span>
				<div class="colors-box">
					<div v-for="i in 5" :key="i" :class="{'color':true, 'active':colorActive}" :style="{'background':color}"></div>
				</div>
			</div>
			<div class="avatar"><img src="@/assets/images/user_default.png" alt="avatar"></div>
			<img src="@/assets/images/DAmcorp_background-1.jpg" id="color-thief" class="color-thief" alt="profile cover">
		</div>
		<div v-if="!showAlertError" class="card-base card-shadow--medium info bg-white black-text">
			<!-- <el-tabs v-model="activeTab"> -->
				<!-- TAB PROFILE -->
				<!-- <el-tab-pane label="Activity" name="info"> -->
					<div class="page-profile-edit">
						<!-- <el-card shadow="none">
						</el-card> -->
						<el-dialog
						title="Info"
						:visible.sync="dialogDetailActivity"
						width="40%"
						:before-close="(done) => { selectedIdAct = ''; selectedRows = null; done() }"
					>
						<div v-if="selectedRows != null" v-loading="loadingDialogDetail">
						<el-row :gutter="10">
							<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
							<h4>Date</h4>
							</el-col>
							<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
							<el-tag
								type="primary"
							>{{ formatDate(selectedRows.created_at, 'dddd, DD MMM YYYY HH:mm') }}</el-tag>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
							<h4>Email</h4>
							</el-col>
							<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
							<el-input type="text" :value="selectedRows.user_email" readonly />
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
							<h4>Username</h4>
							</el-col>
							<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
							<el-input type="text" :value="selectedRows.username" readonly />
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
							<h4>IP</h4>
							</el-col>
							<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
							<el-input type="text" :value="selectedRows.IP" readonly />
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
							<h4>Activity</h4>
							</el-col>
							<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
							<el-input type="text" :value="selectedRows.path" readonly />
							</el-col>
						</el-row>
						<span v-if="selectedRows.data">	
							<el-row :gutter="10">
								<el-col class="mt-10" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<h4>Detail :</h4>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<el-row v-if="dataDate == true">
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
										<div>
											<el-tag
											type="primary"
										>{{ formatDate(selectedRows.data[0], 'dddd, DD MMM YYYY') }}</el-tag>
										<span> to </span>
										<el-tag
											type="primary"
										>{{ formatDate(selectedRows.data[1], 'dddd, DD MMM YYYY') }}</el-tag>
										</div>
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.name" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail" v-if="selectedRows.data.division">PIC Name</h4>
											<h4 class="item-detail" v-else>Name</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.name" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.customer_name" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Company Name</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.customer_name" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.makerChecker" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Maker &amp; Checker</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-switch v-model="selectedRows.data.makerChecker" active-text="Yes" :active-value="'true'" inactive-text="No" :inactive-value="'false'" disabled></el-switch>
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.division" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Division Name</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.division" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.phone_number || selectedRows.data.number" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Phone Number</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.phone_number || selectedRows.data.number" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.quickReply && selectedRows.data.quickReply.title" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Quick Reply Title</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.quickReply.title" readonly />
										</el-col>
									</el-row>
									<span v-if="selectedRows.data.autoResponder">
										<el-row v-if="selectedRows.data.autoResponder.autoResponder" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Lastest Message Auto Responder</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.autoResponder.autoResponder" readonly />
											</el-col>
										</el-row>
										<el-row :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Always Online</h4>
											</el-col>
											<el-col class="mt-30" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-switch v-model="selectedRows.data.autoResponder.always_online" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
											</el-col>
										</el-row>
									</span>
									<el-row v-if="selectedRows.data.template" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Template Name</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.template" readonly />
										</el-col>
									</el-row>
									<span v-if="selectedRows.data.category">
										<el-row v-if="selectedRows.data.category" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Category</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input type="text" :value="selectedRows.data.category" readonly />
											</el-col>
										</el-row>
										<el-row v-if="selectedRows.data.language" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Language</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-tag
												type="primary">{{selectedRows.data.language}}</el-tag>
											</el-col>
										</el-row>
										<span v-if="selectedRows.data.components" >
											<el-row v-for="(el, i) in selectedRows.data.components" :key="i" :gutter="10">
												<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
													<h4 class="item-detail">{{el.type}}</h4>
												</el-col>
												<el-col v-if="el.type.toLowerCase() == 'header' && el.format" class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
													<el-tag type="primary">{{el.format}}</el-tag>
												</el-col>
												<el-col v-if="el.type.toLowerCase() == 'buttons' && el.buttons" class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
													<el-row>
														<el-col class="mb-10" v-for="(val,k) in el.buttons" :key="k">
															<el-row>
																<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
																	<el-button type="info" plain>{{val.text}}</el-button>
																</el-col>
																<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
																	<el-tag type="primary">{{val.type}}</el-tag>
																</el-col>
																<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
																	<el-input v-if="val.phone_number" type="text" :value="val.phone_number" readonly />
																</el-col>
																<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
																	<el-input v-if="val.url" type="text" :value="val.url" readonly />
																</el-col>
															</el-row>
														</el-col>
													</el-row>
												</el-col>
												<el-col v-if="el.text" class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
													<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="el.text" readonly />
												</el-col>
										</el-row>
										</span>
										
									</span>
									<el-row v-if="selectedRows.data.sender" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Sender</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.sender" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.schedule_at" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Date Schedule</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-tag
											type="primary"
											>{{ formatDate(selectedRows.data.schedule_at, 'dddd, DD MMM YYYY HH:mm') }}</el-tag>
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.api_key" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Api Key</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.api_key" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.email" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Email</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.email" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.channels" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Channel</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.channels" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.isPic != undefined" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">PIC</h4>
										</el-col>
										<el-col class="mt-28" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-switch v-model="selectedRows.data.isPic" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.isChecker != undefined" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Checker</h4>
										</el-col>
										<el-col class="mt-28" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-switch v-model="selectedRows.data.isChecker" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.maxBlast && selectedRows.data.maxBlast != ''" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Max Blast</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.maxBlast" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.maxLoad" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Max Load</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.maxLoad" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.group" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Group Name</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<el-input type="text" :value="selectedRows.data.group" readonly />
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.url != undefined" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Link Webhook</h4>
											</el-col>
											<el-col class="mt-28" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<a v-if="selectedRows.data.url != ''"
												style="font-size: 14px;"
												target="_blank"
												v-bind:href="selectedRows.data.url"
												class="mr-10 wabalink-short-url"
												>{{selectedRows.data.url}}</a>
												<el-tag v-else
											type="primary"
											>-</el-tag>
											</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.status != undefined && selectedRows.data.category == undefined" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Status</h4>
											</el-col>
											<el-col class="mt-30" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-switch v-model="selectedRows.data.status" active-text="Available" :active-value="true" inactive-text="Not Available" :inactive-value="false" disabled></el-switch>
											</el-col>
										</el-row>
									<el-row v-if="selectedRows.data.send_status != undefined" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Send Status</h4>
											</el-col>
											<el-col class="mt-30" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-switch v-model="selectedRows.data.send_status" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
											</el-col>
										</el-row>
									<span v-if="selectedRows.data.qr_code">
										<span v-if="selectedRows.data.qr_code.data">
											<el-row :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Link WA</h4>
											</el-col>
											<el-col class="mt-28" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<a
												style="font-size: 14px;"
												target="_blank"
												v-bind:href="selectedRows.data.qr_code.data[0].deep_link_url"
												class="mr-10 wabalink-short-url"
												>{{selectedRows.data.qr_code.data[0].deep_link_url}}</a>
											</el-col>
											</el-row>
											<el-row :gutter="10">
												<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
													<h4 class="item-detail">Prefilled Message</h4>
												</el-col>
												<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
													<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.qr_code.data[0].prefilled_message" readonly />
												</el-col>
											</el-row>
										</span>
									</span>
									<el-row v-if="selectedRows.data.photo != undefined && selectedRows.data.photo != ''" :gutter="10">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Photo</h4>
										</el-col>
										<el-col class="mt-28" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
											<img :src="selectedRows.data.photo" width="100px" height="100px" style="border-radius: 50%" class="avatar">
										</el-col>
									</el-row>
									<el-row v-if="selectedRows.data.group_name">
										<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
											<h4 class="item-detail">Group Name</h4>
										</el-col>
										<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input type="text" :value="selectedRows.data.group_name" readonly />
											</el-col>
										<!-- {{ selectedRows.data.group_name }} -->
									</el-row>
									<el-row v-if="selectedRows.data.about" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">About</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input type="text" :value="selectedRows.data.about" readonly />
											</el-col>
										</el-row>
									<span v-if="selectedRows.data.description">
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Description</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.description.description" readonly />
											</el-col>
										</el-row>
										<el-row :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Address</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.description.address" readonly />
											</el-col>
										</el-row>
										<el-row v-for="(item,key) in selectedRows.data.description.websites" :key="key" :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Website</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input type="text" :value="item" readonly />
											</el-col>
										</el-row>
										
									</span>
									<span v-if="selectedRows.data.masking_phone != undefined">
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Bot Asking Question</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.askQuestion" readonly />
											</el-col>
										</el-row>
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Bot Info Ticket</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.ticketAssign" readonly />
											</el-col>
										</el-row>
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Bot Close Ticket</h4>
											</el-col>
											<el-col class="mt-20" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-input :autosize="{ minRows: 3, maxRows: 3 }" type="textarea" :value="selectedRows.data.ticketClose" readonly />
											</el-col>
										</el-row>
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Masking Phone</h4>
											</el-col>
											<el-col class="mt-30" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-switch v-model="selectedRows.data.masking_phone" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
											</el-col>
										</el-row>
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Show Ticket Per CS Group</h4>
											</el-col>
											<el-col class="mt-30" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-switch v-model="selectedRows.data.only_show_group_ticket" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
											</el-col>
										</el-row>
										<el-row  :gutter="10">
											<el-col class="mt-10" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
												<h4 class="item-detail">Generate Rating Ticket URL</h4>
											</el-col>
											<el-col class="mt-30" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
												<el-switch v-model="selectedRows.data.ticket_rating_enabled" active-text="On" :active-value="true" inactive-text="Off" :inactive-value="false" disabled></el-switch>
											</el-col>
										</el-row>
									</span>
								</el-col>
							</el-row>
						</span>
						</div>
						<span slot="footer" class="dialog-footer">
						<el-button @click="dialogDetailActivity = false">Close</el-button>
						</span>
						</el-dialog>
						<el-card shadow="none" class="mb-20">
							<div class="mb-20">
								<el-tag>{{ totalActivityAll }} Activities</el-tag>
								<h3>Controll Activity</h3>
							</div>
							<div>
								<el-form :model="ruleForm" :rules="ruleForm" ref="ruleForm" label-width="" class="demo-ruleForm">
									<el-form-item>
										<el-col :span="6" class="mr-20">
											<el-form-item prop="date1">
												<el-date-picker type="daterange" placeholder="Pick a filter date" v-model="date1"
												range-separator="-"
												start-placeholder="Start date"
												end-placeholder="End date"
											:picker-options="pickerOptions" format="yyyy/MM/dd" style="width: 100%; cursor: pointer;" @change="doSearchActivity()"></el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item prop="date1">
												<el-input
												clearable
												@keypress.native="doSearchActivity"
												@clear="clearSearchActivity"
												@keyup.native.delete="doSearchActivity"
												v-model="searchActivity" 
												placeholder="Search activity by email">
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6" class="ml-20">
											<el-form-item>
												<el-button :loading='loadingDownload' class="animated fadeInRight" type="primary" @click="download"><i class="mdi mdi-download"></i> Download</el-button>	
											</el-form-item>
										</el-col>
									</el-form-item>
									
								</el-form>
							</div>
							<div>
								<el-tag type="danger">Please download data periodically, such as 1 month</el-tag>
								<!-- <el-tag>Dashboard</el-tag>
								<el-tag>Whatsapp</el-tag> -->
							</div>
						</el-card>
						<!-- <el-card shadow="none" class="mb-20">
							<el-row>
								<el-col :span="6">
									<div class="mb-20">
										Total Activities
									</div>
									<div>
										<h2>{{ totalActivity }}</h2>
									</div>
								</el-col>
							</el-row>
						</el-card> -->
						<el-pagination
							background
							prev-text="Prev"
							next-text="Next"
							layout="prev, pager, next"
							@current-change="paginateActivity"
							:current-page="activities.current_page"
							:page-size="activities.limit"
							:total="totalActivity"
						/>
						<el-card shadow="none">
							<div v-loading="loadingTableActivity">
								<template>
									<el-table
										:data="activity"
										stripe
										style="width: 100%">
										<el-table-column
										fixed
										prop="created_at"
										label="Date"
										width="250"
										>
										<template slot-scope="props">
											<span>{{ formatDate(props.row.created_at, 'dddd, DD MMM YYYY HH:mm:ss') }}</span>
										</template>
										</el-table-column>
										<el-table-column
										prop="username"
										label="Username"
										width="200"
										>
										</el-table-column>
										<el-table-column
										prop="user_email"
										label="Email"
										width="300"
										>
										</el-table-column>
										<el-table-column
										prop="IP"
										label="IP"
										width="200"
										>
										</el-table-column>
										<el-table-column
										prop="path"
										label="Activities"
										width="300">
										</el-table-column>
										<!-- <el-table-column
										label="#"
										fixed="right">
										<template slot-scope="scope">
											<el-button
												v-if="scope.row.type_activity > 0"
												type="default"
												@click.native.prevent="dialogDetailActivity = true; selectedRows = scope.row, getDetailActivity()"
												size="mini"
												class="mt-10"
											> Detail
											</el-button>
										</template>
										</el-table-column> -->
									</el-table>
								</template>
							</div>
						</el-card>
						<el-pagination
							background
							prev-text="Prev"
							next-text="Next"
							layout="prev, pager, next"
							@current-change="paginateActivity"
							:current-page="activities.current_page"
							:page-size="activities.limit"
							:total="totalActivity"
						/>
					</div>
		</div>
		<el-card shadow="none">
			<error-gope-siji v-if="showAlertError" />
		</el-card>
	</div>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'
import ProfileEdit from '@/components/Profile/ProfileEdit'
import config from '../config'
import api from '@/networkClient'
import store from '@/store'
import moment from 'moment'
// import Template from '../../../dashboard-admin/src/pages/consumen/Template.vue'

const NodeRSA = require('node-rsa')
const key = new NodeRSA({b:512});
const pub = key.importKey(config.privateKey, 'pkcs1-public-pem');

export default {
	name: 'Activity',
	data() {
		var checkHasValue = (rule, value, callback) => {
			var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])))(?=.{6,})");

            if (!value) {
                return callback(new Error(this.$t('change_password.warning.null_'+rule.field)));
            } else if(value && value.length < 8 && rule.field != 'old_password') {
				return callback(new Error(this.$t('change_password.warning.min_'+rule.field)));
			} else if(mediumRegex.test(this.form.new_password) == false && rule.field == "new_password") {
				return callback(new Error(this.$t(`change_password.warning.not_strong`)))
			} else{
                callback()
            }
		}
		var validateRepassword = (rule, value, callback) => {
			if(value != this.form.new_password){
				return callback(new Error(this.$t('change_password.warning.not_match')));
			} else{
				callback()
			}
		}
		var validateOldNew = (rule, value, callback) => {
			if(this.form.old_password == this.form.new_password){
				return callback(new Error(this.$t('change_password.warning.same_with_old')));
			} else{
				callback()
			}
		}

		return {
			loadingDialogDetail: false,
			dialogDetailActivity: false,
			dataDate: false,
			searchActivity: '',
			dialogDetail: false,
			selectedRows: '',
			selectedIdAct: '',
			activities: {limit: 30},
			activity: [],
			totalActivity: 0,
			totalActivityAll: 0,
			loadingActivity: false,
			loadingTableActivity: false,
			loadingDownload: false,
			pickerOptions: {
				disabledDate: this.disabledDate
			},
			tableData: [
				{
					date: '2021-05-06 11:32:10',
					name: 'Developer DAM',
					type: 'Submit',
					activities: 'Login on panel'
				}, 
				{
					date: '2021-05-06 11:32:16',
					name: 'Developer DAM',
					type: 'View',
					activities: 'View dashboard menu'
				},
				{
					date: '2021-05-06 11:32:20',
					name: 'Developer DAM',
					type: 'View',
					activities: 'View whatsapp menu'
				},
				{
					date: '2021-05-06 11:39:14',
					name: 'Developer DAM',
					type: 'View',
					activities: 'View whatsapp request template menu'
				},
				{
					date: '2021-05-06 11:43:10',
					name: 'Developer DAM',
					type: 'Submit',
					activities: 'Request template'
				} 
			],
			date1: [new Date(), new Date()],
			ruleForm: {
				name: '',
				region: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			username: 'Aurora Shenton',
			colorActive: false,
			color: 'white',
			activeTab: 'info',
            affixEnabled: true,
            userprofile: {},
            companyprofile: {},
			loadingProfile: true,
			loadingBtnPassword: false,
			bussinessId: store.getters.bussinessId,
			showAlertError: false,
			timeout: null
		}
	},
	methods: {
		formatDate(str, format = "YYYY-MM-DD hh:mm:ss"){
			return moment(str).format(format)
		},
		disabledDate(date) {
				return new Date() < date
		},
		paginateActivity(page) {
			this.activities.current_page = page;
			if (this.searchActivity != '') {
				this.getActivity(this.searchActivity);
			}
			else {
				this.getActivity();
			}
		},
		download(){
			this.getActivity(this.searchActivity, true)
		},
		clearSearchActivity(){
			this.activities.current_page = 1;
			this.getActivity();
		},
		doSearchActivity(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchActivity.length >= 3) {
				this.activities.current_page = 1;
				this.getActivity(this.searchActivity);
				} else {
				this.getActivity();
				}
			}, 1000);
		},
		async getActivity(query = '', download = false){
			this.loadingTableActivity = true
			let apiOptions = {
				method: 'get',
				url: config.baseApi + 'activity/list',
				params: {
					page: this.activities.current_page,
					query: query,
					download: download,
					total: this.totalActivity,
					startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
                    endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
				},
				timeout: 10 * 1000
			}
			if(download == true){
				apiOptions.responseType = "arraybuffer"
				this.loadingDownload = true
			}
			await api(apiOptions).then(response => {
				// console.log('response', response);
				if (response.status == 200) {
					
				}
				 if (response.data.ec == 200) {
					 this.activity = response.data.data.data
					 this.totalActivity = response.data.data.count > 450 ? 450 : response.data.data.count
					 this.totalActivityAll = response.data.data.count
					// console.log('activity',this.activity)
					this.loadingActivity = false
				}
				else if(download == true){
					if(response.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([response.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Activity Panel (Platform by DAMCorp).xlsx'); //or any other extension
							link.click();
						} catch(err){
							// console.log(err.message)
						}
					} else{
						this.$swal(this.$t('error'), this.$t(`helpdesk.${response.data.message}`), "error")
					}
				}
				else {
					this.showAlertError = true
				}
				this.loadingDownload = false
				this.loadingTableActivity = false

			}).catch(error => {
				this.loadingActivity = false
				this.loadingDownload = false
				this.loadingTableActivity = false
				this.showAlertError = true
				// this.$swal(this.$t('error'), this.$t('error_text'), "warning")
			})
		},
		async getDetailActivity(){
			this.loadingDialogDetail = true
			await api({
				method: 'get',
				url: config.baseApi + 'activity/' + this.selectedRows.activity_id,
			}).then(response => {
				// console.log(response);
				 if (response.data.ec == 200) {
					 let data = response.data.data.data
					 this.selectedRows.data = data
					 this.dataDate = false
					 if (data != null && data.date) {
						 this.selectedRows.data = data.date
						 this.dataDate = true
					 }
				}
				else if (response.data.ec != 200) {
					this.dialogDetailActivity = false
					this.$swal(this.$t('error'), "This Detail Activity Not Found. Maybe has been deleted", "warning")
				}

				this.loadingDialogDetail = false

			}).catch(error => {
				console.log(error);
				this.dialogDetailActivity = false
				this.loadingDialogDetail = false
				this.$swal(this.$t('error'), this.$t('error_text'), "warning")
			})
		},
		resizeAffixEnabled() {
			if(window.innerWidth <= 768) {
				this.affixEnabled = false	
			} else {
				this.affixEnabled = true	
			}
		},
		async addWebsite(){
			return ''
		},
        async profile(){
			this.loadingProfile = true
			await api({
				method: 'get',
				url: config.baseApi + 'auth/profile',
				timeout: 10 * 1000
			}).then(response => {
                this.loadingProfile = false
				this.userprofile = response.data.data.user_profile
				this.username = this.userprofile.name
                if(this.userprofile.customer_type == 2){
                    this.companyprofile = response.data.data.company_profile
                } else{
					this.companyprofile.customer_type = this.userprofile.customer_type
					this.companyprofile.status_upgrade = this.userprofile.status_upgrade
                }
			}).catch(error => {
				this.loadingProfile = false
				this.showAlertError = true
				// this.$swal(this.$t('error'), this.$t('error_text'), "warning")
			})
		},
		go(url){
			this.$router.push(url);
		}
    },
    async beforeMount(){
        await this.profile()
    },
	mounted() {
		this.loadingActivity = true
		this.getActivity()
		var colorThief = new ColorThief();
		setTimeout(()=>{
			let rgb = colorThief.getColor(document.getElementById('color-thief'))
			//console.log('Profile mounted', rgb)
			this.colorActive = true
			this.color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
		}, 1000)

		this.resizeAffixEnabled();
        window.addEventListener('resize', this.resizeAffixEnabled);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeAffixEnabled);
	},
	components: {
		Affix,
        ProfileEdit
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.item-detail {
	font-weight: normal;
}

.dot {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 24px;
  color: #fff;
  text-align: center;
  background: #000;
  display: inline-block;
}

.wabalink-short-url {
  text-align: center;
  font-size: 9.5px;
}

.tip{padding:8px 16px;background-color:#ecf8ff;border-radius:4px;border-left:5px solid #50bfff;margin:20px 0}
.page-profile {
	overflow: auto;

	.identity {
		margin-bottom: 20px;
		position: relative;
		width: 100%;
		height: 200px;

		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('../assets/images/DAmcorp_background-1.jpg');
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}
		.username {
			color: #32325d;
			position: absolute;
			width: 100%;
			height: 50px;
			bottom: 75px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			.cover-small {
				width: 220px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -220px;
				position: relative;
				left: -250px;
				border-radius: 9px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				background-image: url('../assets/images/DAmcorp_background-1.jpg');
				background-position: 50%;
				background-size: cover;
				background-repeat: no-repeat;
				-webkit-transition: all .5s;
				transition: all .5s;
			}
			.avatar-small {
				width: 50px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -50px;
				position: relative;
				left: -100px;
				border-radius: 50%;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				transform: rotate(-50deg);
				transition: all .5s;
			}
			.avatar-small img {
				width: 100%;
			}

			&.affix {
				z-index: 99;
				border-radius: 5px;

				.cover-small {
					opacity: 1;
				}

				.avatar-small {
					opacity: 1;
					left: -60px;
					transform: rotate(0deg);
				}
			}

			.colors-box {
				height: 50px;
				background: white; //091c2d
				float: right;

				.color {
					width: 50px;
					height: 50px;
					background: white; //091c2d
					float: right;
					transform: skew(-45deg);
					box-shadow: 1px 0px 1px 0px transparent;
					position: relative;
					right: -25px;
					margin-right: -50px;
					transition: margin-right .75s;

					&.active {
						margin-right: 0;
					}

					&:nth-child(2) { opacity: .8; }
					&:nth-child(3) { opacity: .6; }
					&:nth-child(4) { opacity: .4; }
					&:nth-child(5) { opacity: .2; }
				}
			}
		}
		.avatar {
			border: 6px solid #fff;
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);

			img {
				width: 100%;
			}
		}

		.color-thief {
			display: block;
			width: 100px;
			visibility: hidden;
			z-index: -999999;
			position: absolute;
		}
	}

	.info {
		padding: 24px 32px;
	}
}

@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: auto;

			.avatar {
				bottom: inherit;
				top: 10px;
				left: 50%;
				width: 100px;
				margin-left: -50px;
				height: 100px;
				border-width: 3px;
			}

			.username {
				position: inherit;
				padding: 10px ;
				margin: 0;
				top: inherit;
				left: inherit;
				z-index: 1;
				right: inherit;
				text-align: center;
				bottom: inherit;
				white-space: inherit;
				line-height: inherit;
				height: auto;
				margin-top: 120px;
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
				border-radius: 50px;

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				.cover-small {
					display: none;
				}
			}
		}

		.info {
			padding: 8px 16px;
		}
	}
}
</style>

<style lang="scss">
.page-profile {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>
