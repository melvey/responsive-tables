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
		className: 'scroll'
	},
	{
		title: 'page4',
		className: 'linkTable'
	},
	{
		title: 'page5',
		className: 'hide'
	},
	{
		title: 'page6',
		className: 'collapseTable'
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

gulp.task('default', ['styles', 'pages', 'includeTableLink']);
