var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var jadeData = [
	{
		title: 'page1',
		className: 'percent'
	},
	{
		title: 'page2',
		className: 'fixed'
	},
	{
		title: 'page3',
		className: 'scroll',
		wrapperClass: 'table-container-scroll'
	},
	{
		title: 'page4',
		className: 'linkTable',
		scripts: [
			'https://code.jquery.com/jquery-2.2.2.min.js',
			'tableLink/jquery.tableLink.js'
		],
		injectScript: '$(document).ready(function() { $(".linkTable").tableLink({hide: "600px"}); });'
	},
	{
		title: 'page5',
		className: 'hide'
	},
	{
		title: 'page6',
		className: 'collapseTable'
	},
	{
		title: 'page7',
		className: 'rotateTable'
	},
	{
		title: 'page8',
		className: 'footable',
		stylesheets: [
			'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css',
			'vendor/footable/css/footable.standalone.css'
		],
		scripts: [
			'https://code.jquery.com/jquery-2.2.2.min.js',
			'vendor/footable/js/footable.js'
		],
		injectScript: [
			'$(document).ready(function() { $(".footable").footable(); });'
		]
	},
	{
		title: 'page9',
		className: 'responsive',
		stylesheets: [
			'vendor/responsive-tables/responsive-tables.css'
		],
		scripts: [
			'https://code.jquery.com/jquery-2.2.2.min.js',
			'vendor/responsive-tables/responsive-tables.js'
		]
	}

];

gulp.task('pages', function() {
	for(var i = 0; i < jadeData.length; i++) {
		gulp.src('./src/content.jade')
			.pipe(rename({basename: jadeData[i].title.replace(/ /g, '-')}))
			.pipe(jade({
				pretty: true,
				locals: jadeData[i]
			}))
			.pipe(gulp.dest('build'));
	}
});

gulp.task('styles', function() {
	gulp.src('./src/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build'));
});

gulp.task('includeTableLink', function() {
	gulp.src('./src/tableLink/*')
		.pipe(gulp.dest('build/tableLink'));
});

gulp.task('libraries', function() {
	gulp.src('./vendor/**')
	.pipe(gulp.dest('build/vendor'));
});

gulp.task('default', ['styles', 'pages', 'includeTableLink', 'libraries']);
