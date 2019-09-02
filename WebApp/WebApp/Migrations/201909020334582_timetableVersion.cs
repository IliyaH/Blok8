namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class timetableVersion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Timetables", "Version", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Timetables", "Version");
        }
    }
}
